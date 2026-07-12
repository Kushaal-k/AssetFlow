import prisma from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";

const createAllocationService = async (allocationData: Prisma.AllocationUncheckedCreateInput) => {
    return await prisma.allocation.create({
        data: allocationData
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