import type { DepartmentStatus } from '@prisma/client';

export interface DepartmentRecord {
  id: string;
  name: string;
  status: DepartmentStatus;
  headId: string | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDepartmentInput {
  name: string;
  status?: DepartmentStatus;
  headId?: string;
  parentId?: string;
}

export interface UpdateDepartmentInput {
  name?: string;
  status?: DepartmentStatus;
  headId?: string | null;
  parentId?: string | null;
}

export interface DepartmentRepository {
  findAll(): Promise<DepartmentRecord[]>;
  findById(id: string): Promise<DepartmentRecord | null>;
  create(input: CreateDepartmentInput): Promise<DepartmentRecord>;
  update(id: string, input: UpdateDepartmentInput): Promise<DepartmentRecord>;
  delete(id: string): Promise<void>;
}
