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

const returnAllocationService = async (allocationId: string, notes?: string) => {
    // TODO: We will implement this in Milestone 4. 
    // It requires updating `actualReturnDate` and setting status to RETURNED.
}

const transferAllocationService = async (allocationId: string, requestorId: string) => {
    // TODO: Implement Transfer Request logic (Milestone 4)
}

const approveTransferService = async (allocationId: string) => {
    // TODO: Implement Transfer Approval logic (Milestone 4)
}

export {
    createAllocationService,
    returnAllocationService,
    transferAllocationService,
    approveTransferService
}