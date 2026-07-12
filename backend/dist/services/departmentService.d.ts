import type { CreateDepartmentInput, DepartmentRecord, DepartmentRepository, UpdateDepartmentInput } from '../types/department.js';
export declare class DepartmentError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare function createDepartmentService(departmentRepository: DepartmentRepository): {
    getAllDepartments(): Promise<DepartmentRecord[]>;
    getDepartmentById(id: string): Promise<DepartmentRecord>;
    createDepartment(input: CreateDepartmentInput): Promise<DepartmentRecord>;
    updateDepartment(id: string, input: UpdateDepartmentInput): Promise<DepartmentRecord>;
    deleteDepartment(id: string): Promise<void>;
};
export type DepartmentService = ReturnType<typeof createDepartmentService>;
//# sourceMappingURL=departmentService.d.ts.map