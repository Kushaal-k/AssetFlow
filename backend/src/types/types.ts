export interface IAllocation {
    id: string;
    assetId: string;
    assignedToId: string;
    assignedDeptId: string;
    expectedReturnDate: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface IReturn {
    id: string;
    allocationId: string;
    returnedDate: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApproveTransferInput {
    newAssignedToId: string;
    newAssignedDeptId?: string;
}
