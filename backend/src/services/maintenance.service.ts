import prisma from "../lib/prisma.js";
import type { ICreateMaintenanceInput, IFetchMaintenanceQuery, MaintenanceStatus } from "../types/types.js";

const createMaintenanceService = async (input: ICreateMaintenanceInput) => {
    return await prisma.$transaction(async (tx) => {
        const asset = await tx.asset.findUnique({
            where: { id: input.assetId }
        });

        if (!asset) {
            throw new Error("Asset not found");
        }

        const request = await tx.maintenanceRequest.create({
            data: {
                assetId: input.assetId,
                raisedById: input.raisedById,
                issueDescription: input.issueDescription,
                priority: input.priority,
                status: 'PENDING'
            }
        });

        return request;
    });
};

const updateMaintenanceStatusService = async (id: string, newStatus: MaintenanceStatus) => {
    return await prisma.$transaction(async (tx) => {
        const request = await tx.maintenanceRequest.findUnique({
            where: { id }
        });

        if (!request) {
            throw new Error("Maintenance request not found");
        }

        const currentStatus = request.status;

        // Validation for state transitions
        const validTransitions: Record<string, string[]> = {
            'PENDING': ['APPROVED', 'REJECTED'],
            'APPROVED': ['IN_PROGRESS'],
            'IN_PROGRESS': ['RESOLVED'],
            'RESOLVED': [],
            'REJECTED': []
        };

        const allowed = validTransitions[currentStatus] || [];
        if (!allowed.includes(newStatus)) {
            throw new Error(`Cannot transition maintenance request from ${currentStatus} to ${newStatus}`);
        }

        const updatedRequest = await tx.maintenanceRequest.update({
            where: { id },
            data: { status: newStatus }
        });

        // Asset Status Sync logic
        if (newStatus === 'APPROVED' || newStatus === 'IN_PROGRESS') {
            await tx.asset.update({
                where: { id: request.assetId },
                data: { status: 'MAINTENANCE' }
            });
        } else if (newStatus === 'RESOLVED' || newStatus === 'REJECTED') {
            // Only revert if there are no other active maintenance requests for this asset
            const activeRequests = await tx.maintenanceRequest.count({
                where: {
                    assetId: request.assetId,
                    status: {
                        in: ['PENDING', 'APPROVED', 'IN_PROGRESS']
                    }
                }
            });

            if (activeRequests === 0) {
                await tx.asset.update({
                    where: { id: request.assetId },
                    data: { status: 'AVAILABLE' } // Or potentially checking allocations, but AVAILABLE is a safe default here
                });
            }
        }

        return updatedRequest;
    });
};

const fetchMaintenanceService = async (query: IFetchMaintenanceQuery) => {
    const whereClause: any = {};
    
    if (query.assetId) {
        whereClause.assetId = query.assetId;
    }
    
    if (query.status) {
        whereClause.status = query.status;
    }

    if (query.priority) {
        whereClause.priority = query.priority;
    }

    return await prisma.maintenanceRequest.findMany({
        where: whereClause,
        include: {
            asset: { select: { id: true, name: true, tag: true } },
            raisedBy: { select: { id: true, name: true, email: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export {
    createMaintenanceService,
    updateMaintenanceStatusService,
    fetchMaintenanceService
};
