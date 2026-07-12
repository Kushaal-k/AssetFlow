import prisma from "../lib/prisma.js";

const createAllocationService = async (assetId: string, assignedToId: string, assignedDeptId: string, expectedReturnDate: string, notes: string) => {
    return await prisma.allocation.create({
        data: {
            assetId,
            assignedToId,
            assignedDeptId,
            expectedReturnDate,
            notes
        }
    });
}

export {
    createAllocationService
}