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

export interface ITransfer {
    id: string;
    allocationId: string;
    newAssignedToId: string;
    newAssignedDeptId: string;
    transferDate: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
}

