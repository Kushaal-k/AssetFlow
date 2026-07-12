import type { CreateDepartmentInput, DepartmentRecord, DepartmentRepository, UpdateDepartmentInput } from '../types/department.js';

export class DepartmentError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = 'DepartmentError';
  }
}

export function createDepartmentService(departmentRepository: DepartmentRepository) {
  return {
    async getAllDepartments(): Promise<DepartmentRecord[]> {
      return departmentRepository.findAll();
    },

    async getDepartmentById(id: string): Promise<DepartmentRecord> {
      const department = await departmentRepository.findById(id);
      if (!department) {
        throw new DepartmentError('Department not found', 404);
      }
      return department;
    },

    async createDepartment(input: CreateDepartmentInput): Promise<DepartmentRecord> {
      if (!input.name || input.name.trim() === '') {
        throw new DepartmentError('Department name is required', 400);
      }
      
      if (input.parentId) {
        const parent = await departmentRepository.findById(input.parentId);
        if (!parent) {
          throw new DepartmentError('Parent department not found', 400);
        }
      }

      return departmentRepository.create({
        ...input,
        name: input.name.trim(),
      });
    },

    async updateDepartment(id: string, input: UpdateDepartmentInput): Promise<DepartmentRecord> {
      const existing = await departmentRepository.findById(id);
      if (!existing) {
        throw new DepartmentError('Department not found', 404);
      }

      if (input.name !== undefined && input.name.trim() === '') {
        throw new DepartmentError('Department name cannot be empty', 400);
      }

      if (input.parentId) {
        if (input.parentId === id) {
          throw new DepartmentError('A department cannot be its own parent', 400);
        }
        const parent = await departmentRepository.findById(input.parentId);
        if (!parent) {
          throw new DepartmentError('Parent department not found', 400);
        }
      }

      const updateData: Record<string, unknown> = { ...input };
      if (input.name) {
        updateData.name = input.name.trim();
      } else {
        delete updateData.name; // Keep typescript happy if it was passed as undefined
      }

      return departmentRepository.update(id, updateData);
    },

    async deleteDepartment(id: string): Promise<void> {
      const existing = await departmentRepository.findById(id);
      if (!existing) {
        throw new DepartmentError('Department not found', 404);
      }
      
      await departmentRepository.delete(id);
    },
  };
}

export type DepartmentService = ReturnType<typeof createDepartmentService>;
