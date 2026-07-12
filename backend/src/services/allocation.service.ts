import prisma from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";

const createAllocationService = async (allocationData: Prisma.AllocationUncheckedCreateInput) => {
    return await prisma.$transaction(async (tx) => {
        // Check current asset status
        const asset = await tx.asset.findUnique({
            where: { id: allocationData.assetId }
        });

        if (!asset || asset.status !== 'AVAILABLE') {
            throw new Error(`Asset is not available for allocation. Current status: ${asset?.status || 'NOT_FOUND'}`);
        }

        // Update asset status
        await tx.asset.update({
            where: { id: asset.id },
            data: { status: 'ALLOCATED' }
        });

        // Create the allocation
        const newAllocation = await tx.allocation.create({
            data: allocationData
        });

        return newAllocation;
    });
}

const returnAllocationService = async (allocationId: string, notes?: string, condition?: string) => {
    return await prisma.$transaction(async (tx) => {
        const updatedAllocation = await tx.allocation.update({
            where: { id: allocationId },
            data: {
                status: 'RETURNED',
                actualReturnDate: new Date(),
                ...(notes && { notes })
            }
        });

        await tx.asset.update({
            where: { id: updatedAllocation.assetId },
            data: {
                status: 'AVAILABLE',
                ...(condition && { condition })
            }
        });

        return updatedAllocation;
    });
}

export {
    createAllocationService,
    returnAllocationService
};