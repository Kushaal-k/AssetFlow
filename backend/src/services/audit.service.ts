import prisma from "../lib/prisma.js";
import type { ICreateAuditCycleInput, IRecordAuditItemInput } from "../types/types.js";

const createAuditCycleService = async (input: ICreateAuditCycleInput) => {
    return await prisma.auditCycle.create({
        data: {
            name: input.name,
            status: 'OPEN'
        }
    });
};

const fetchAuditCyclesService = async () => {
    return await prisma.auditCycle.findMany({
        include: {
            records: {
                select: { id: true, status: true, assetId: true }
            },
            _count: {
                select: { records: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};

const recordAuditItemService = async (input: IRecordAuditItemInput) => {
    return await prisma.$transaction(async (tx) => {
        const cycle = await tx.auditCycle.findUnique({
            where: { id: input.cycleId }
        });

        if (!cycle) {
            throw new Error("Audit cycle not found");
        }
        
        if (cycle.status === 'CLOSED') {
            throw new Error("Cannot record items in a closed audit cycle");
        }

        const asset = await tx.asset.findUnique({
            where: { id: input.assetId }
        });

        if (!asset) {
            throw new Error("Asset not found");
        }

        // Upsert the record for this cycle and asset
        const record = await tx.auditRecord.findFirst({
            where: {
                cycleId: input.cycleId,
                assetId: input.assetId
            }
        });

        let savedRecord;
        if (record) {
            savedRecord = await tx.auditRecord.update({
                where: { id: record.id },
                data: {
                    status: input.status,
                    notes: input.notes,
                    auditorId: input.auditorId
                }
            });
        } else {
            savedRecord = await tx.auditRecord.create({
                data: {
                    cycleId: input.cycleId,
                    assetId: input.assetId,
                    auditorId: input.auditorId,
                    status: input.status,
                    notes: input.notes
                }
            });
        }

        // Sync Asset status if damaged or missing
        if (input.status === 'DAMAGED') {
            await tx.asset.update({
                where: { id: input.assetId },
                data: { status: 'MAINTENANCE' }
            });
        } else if (input.status === 'MISSING') {
            await tx.asset.update({
                where: { id: input.assetId },
                data: { status: 'LOST' }
            });
        }

        return savedRecord;
    });
};

const closeAuditCycleService = async (cycleId: string, closingUserId: string) => {
    return await prisma.$transaction(async (tx) => {
        const cycle = await tx.auditCycle.findUnique({
            where: { id: cycleId }
        });

        if (!cycle) {
            throw new Error("Audit cycle not found");
        }

        if (cycle.status === 'CLOSED') {
            throw new Error("Audit cycle is already closed");
        }

        // 1. Find all active assets that were NOT audited in this cycle
        // We consider active assets to be those that are AVAILABLE or ALLOCATED
        const activeAssets = await tx.asset.findMany({
            where: {
                status: {
                    in: ['AVAILABLE', 'ALLOCATED']
                },
                auditRecords: {
                    none: {
                        cycleId: cycleId
                    }
                }
            }
        });

        // 2. Automatically flag them as MISSING
        for (const asset of activeAssets) {
            await tx.auditRecord.create({
                data: {
                    cycleId: cycleId,
                    assetId: asset.id,
                    auditorId: closingUserId, // The person who closes the cycle flags the rest as missing
                    status: 'MISSING',
                    notes: 'Automatically flagged as missing at cycle close'
                }
            });

            // Sync Asset status
            await tx.asset.update({
                where: { id: asset.id },
                data: { status: 'LOST' }
            });
        }

        // 3. Close the cycle
        return await tx.auditCycle.update({
            where: { id: cycleId },
            data: {
                status: 'CLOSED',
                endDate: new Date()
            }
        });
    });
};

export {
    createAuditCycleService,
    fetchAuditCyclesService,
    recordAuditItemService,
    closeAuditCycleService
};
