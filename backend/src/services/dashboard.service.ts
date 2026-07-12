import prisma from "../lib/prisma.js";
import type { IDashboardStats, IOverdueAllocation } from "../types/types.js";

export const fetchDashboardStatsService = async (): Promise<IDashboardStats> => {
    // 1. Group by Asset Status to get counts
    const assetCounts = await prisma.asset.groupBy({
        by: ['status'],
        _count: {
            id: true
        }
    });

    let totalAssets = 0;
    let availableAssets = 0;
    let allocatedAssets = 0;
    let maintenanceAssets = 0;
    let lostAssets = 0;

    for (const group of assetCounts) {
        totalAssets += group._count.id;
        
        switch (group.status) {
            case 'AVAILABLE':
                availableAssets = group._count.id;
                break;
            case 'ALLOCATED':
                allocatedAssets = group._count.id;
                break;
            case 'MAINTENANCE':
                maintenanceAssets = group._count.id;
                break;
            case 'LOST':
                lostAssets = group._count.id;
                break;
            // RESERVED, RETIRED, DISPOSED are just added to total
        }
    }

    // 2. Query overdue allocations
    const overdueRecords = await prisma.allocation.findMany({
        where: {
            status: 'ACTIVE',
            expectedReturnDate: {
                lt: new Date()
            }
        },
        include: {
            asset: { select: { name: true, tag: true } },
            assignedTo: { select: { id: true, name: true } }
        },
        orderBy: {
            expectedReturnDate: 'asc'
        }
    });

    const overdueAllocations: IOverdueAllocation[] = overdueRecords.map(record => ({
        id: record.id,
        assetId: record.assetId,
        assetName: record.asset.name,
        assetTag: record.asset.tag,
        assignedToId: record.assignedTo?.id || null,
        assignedToName: record.assignedTo?.name || null,
        expectedReturnDate: record.expectedReturnDate?.toISOString() || ''
    }));

    return {
        totalAssets,
        availableAssets,
        allocatedAssets,
        maintenanceAssets,
        lostAssets,
        overdueAllocations
    };
};
