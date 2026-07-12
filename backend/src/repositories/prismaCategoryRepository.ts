import type { Prisma } from '@prisma/client';
import { getPrismaClient } from '../lib/prisma.js';
import type { CategoryRepository } from '../types/category.js';

export function createPrismaCategoryRepository(): CategoryRepository {
  const client = getPrismaClient();

  return {
    async findAll() {
      return client.assetCategory.findMany();
    },

    async findById(id) {
      return client.assetCategory.findUnique({
        where: { id },
      });
    },

    async findByName(name) {
      return client.assetCategory.findUnique({
        where: { name },
      });
    },

    async create(input) {
      const data: Prisma.AssetCategoryCreateInput = {
        name: input.name,
      };
      if (input.attributes !== undefined) {
        data.attributes = input.attributes;
      }

      return client.assetCategory.create({ data });
    },

    async update(id, input) {
      const data: Prisma.AssetCategoryUpdateInput = {};
      if (input.name !== undefined) data.name = input.name;
      if (input.attributes !== undefined) data.attributes = input.attributes;

      return client.assetCategory.update({
        where: { id },
        data,
      });
    },

    async delete(id) {
      await client.assetCategory.delete({
        where: { id },
      });
    },
  };
}
