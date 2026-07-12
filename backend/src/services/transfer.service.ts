import prisma from "../lib/prisma.js";
import type { IApproveTransferInput } from "../types/types.js";

const requestTransferService = async (allocationId: string) => {
    const allocation = await prisma.allocation.findUnique({
        where: { id: allocationId }
    });

    if (!allocation) {
        throw new Error("Allocation not found");
    }

    if (allocation.status !== 'ACTIVE') {
        throw new Error(`Cannot request transfer. Allocation status is ${allocation.status}, expected ACTIVE`);
    }

    return await prisma.allocation.update({
        where: { id: allocationId },
        data: { status: 'TRANSFER_REQUESTED' }
    });
};

const approveTransferService = async (allocationId: string, input: IApproveTransferInput) => {
    return await prisma.$transaction(async (tx) => {
        const allocation = await tx.allocation.findUnique({
            where: { id: allocationId }
        });

        if (!allocation) {
            throw new Error("Allocation not found");
        }

        if (allocation.status !== 'TRANSFER_REQUESTED') {
            throw new Error(`Cannot approve transfer. Allocation status is ${allocation.status}, expected TRANSFER_REQUESTED`);
        }

        // Close the old allocation
        await tx.allocation.update({
            where: { id: allocationId },
            data: {
                status: 'RETURNED',
                actualReturnDate: new Date()
            }
        });

        // Create new allocation for the recipient
        const newAllocation = await tx.allocation.create({
            data: {
                assetId: allocation.assetId,
                assignedToId: input.newAssignedToId,
                ...(input.newAssignedDeptId && { assignedDeptId: input.newAssignedDeptId })
            }
        });

        return newAllocation;
    });
};

const rejectTransferService = async (allocationId: string) => {
    const allocation = await prisma.allocation.findUnique({
        where: { id: allocationId }
    });

    if (!allocation) {
        throw new Error("Allocation not found");
    }

    if (allocation.status !== 'TRANSFER_REQUESTED') {
        throw new Error(`Cannot reject transfer. Allocation status is ${allocation.status}, expected TRANSFER_REQUESTED`);
    }

    return await prisma.allocation.update({
        where: { id: allocationId },
        data: { status: 'ACTIVE' }
    });
};

const getPendingTransfersService = async () => {
    return await prisma.allocation.findMany({
        where: { status: 'TRANSFER_REQUESTED' },
        include: {
            asset: { select: { id: true, name: true, tag: true } },
            assignedTo: { select: { id: true, name: true, email: true } },
            assignedDept: { select: { id: true, name: true } }
        },
        orderBy: { updatedAt: 'desc' }
    });
};

export {
    requestTransferService,
    approveTransferService,
    rejectTransferService,
    getPendingTransfersService
};
