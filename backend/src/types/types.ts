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

export type MaintenancePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type MaintenanceStatus = 'PENDING' | 'APPROVED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export interface ICreateMaintenanceInput {
    assetId: string;
    raisedById: string;
    issueDescription: string;
    priority: MaintenancePriority;
}

export interface IUpdateMaintenanceStatusInput {
    status: MaintenanceStatus;
}

export interface IFetchMaintenanceQuery {
    assetId?: string;
    status?: MaintenanceStatus;
    priority?: MaintenancePriority;
}

export type AuditStatus = 'OPEN' | 'CLOSED';
export type AuditItemStatus = 'VERIFIED' | 'MISSING' | 'DAMAGED';

export interface ICreateAuditCycleInput {
    name: string;
}

export interface IRecordAuditItemInput {
    cycleId: string;
    assetId: string;
    auditorId: string;
    status: AuditItemStatus;
    notes?: string;
}

export type RoleType = 'ADMIN' | 'ASSET_MANAGER' | 'DEPT_HEAD' | 'EMPLOYEE';

export interface IFetchUsersQuery {
    departmentId?: string;
    role?: RoleType;
}

export interface IUpdateUserRoleInput {
    role: RoleType;
}

export interface IFetchAssetsQuery {
    search?: string;
    categoryId?: string;
    departmentId?: string;
    status?: string; // e.g. 'AVAILABLE', 'ALLOCATED', etc.
}

export interface ICreateAssetInput {
    name: string;
    categoryId: string;
    departmentId?: string;
    serialNumber?: string;
    condition?: string;
    isBookable?: boolean;
}
