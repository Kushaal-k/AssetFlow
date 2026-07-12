import type { AssetCategoryRecord, CategoryRepository, CreateCategoryInput, UpdateCategoryInput } from '../types/category.js';

export class CategoryError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = 'CategoryError';
  }
}

export function createCategoryService(categoryRepository: CategoryRepository) {
  return {
    async getAllCategories(): Promise<AssetCategoryRecord[]> {
      return categoryRepository.findAll();
    },

    async getCategoryById(id: string): Promise<AssetCategoryRecord> {
      const category = await categoryRepository.findById(id);
      if (!category) {
        throw new CategoryError('Category not found', 404);
      }
      return category;
    },

    async createCategory(input: CreateCategoryInput): Promise<AssetCategoryRecord> {
      if (!input.name || input.name.trim() === '') {
        throw new CategoryError('Category name is required', 400);
      }
      
      const trimmedName = input.name.trim();

      const existing = await categoryRepository.findByName(trimmedName);
      if (existing) {
        throw new CategoryError(`Category with name '${trimmedName}' already exists`, 409);
      }

      const createInput: Parameters<typeof categoryRepository.create>[0] = { name: trimmedName };
      if (input.attributes !== undefined) createInput.attributes = input.attributes;

      return categoryRepository.create(createInput);
    },

    async updateCategory(id: string, input: UpdateCategoryInput): Promise<AssetCategoryRecord> {
      const existing = await categoryRepository.findById(id);
      if (!existing) {
        throw new CategoryError('Category not found', 404);
      }

      let trimmedName: string | undefined;
      if (input.name !== undefined) {
        trimmedName = input.name.trim();
        if (trimmedName === '') {
          throw new CategoryError('Category name cannot be empty', 400);
        }

        if (trimmedName !== existing.name) {
          const nameConflict = await categoryRepository.findByName(trimmedName);
          if (nameConflict) {
            throw new CategoryError(`Category with name '${trimmedName}' already exists`, 409);
          }
        }
      }

      const updateData: Record<string, unknown> = {};
      if (trimmedName !== undefined) updateData.name = trimmedName;
      if (input.attributes !== undefined) updateData.attributes = input.attributes;

      return categoryRepository.update(id, updateData);
    },

    async deleteCategory(id: string): Promise<void> {
      const existing = await categoryRepository.findById(id);
      if (!existing) {
        throw new CategoryError('Category not found', 404);
      }

      await categoryRepository.delete(id);
    },
  };
}

export type CategoryService = ReturnType<typeof createCategoryService>;
