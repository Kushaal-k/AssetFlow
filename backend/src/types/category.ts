import type { Prisma } from '@prisma/client';

export interface AssetCategoryRecord {
  id: string;
  name: string;
  attributes: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryInput {
  name: string;
  attributes?: Prisma.InputJsonValue;
}

export interface UpdateCategoryInput {
  name?: string;
  attributes?: Prisma.InputJsonValue;
}

export interface CategoryRepository {
  findAll(): Promise<AssetCategoryRecord[]>;
  findById(id: string): Promise<AssetCategoryRecord | null>;
  findByName(name: string): Promise<AssetCategoryRecord | null>;
  create(input: CreateCategoryInput): Promise<AssetCategoryRecord>;
  update(id: string, input: UpdateCategoryInput): Promise<AssetCategoryRecord>;
  delete(id: string): Promise<void>;
}
