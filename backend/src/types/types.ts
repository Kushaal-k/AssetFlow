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

export interface ICreateBookingInput {
    assetId: string;
    bookedById: string;
    startTime: string; // ISO DateTime
    endTime: string;   // ISO DateTime
}

export interface IFetchBookingsQuery {
    assetId?: string;
    startDate?: string;
    endDate?: string;
}
