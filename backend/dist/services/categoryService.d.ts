import type { AssetCategoryRecord, CategoryRepository, CreateCategoryInput, UpdateCategoryInput } from '../types/category.js';
export declare class CategoryError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare function createCategoryService(categoryRepository: CategoryRepository): {
    getAllCategories(): Promise<AssetCategoryRecord[]>;
    getCategoryById(id: string): Promise<AssetCategoryRecord>;
    createCategory(input: CreateCategoryInput): Promise<AssetCategoryRecord>;
    updateCategory(id: string, input: UpdateCategoryInput): Promise<AssetCategoryRecord>;
    deleteCategory(id: string): Promise<void>;
};
export type CategoryService = ReturnType<typeof createCategoryService>;
//# sourceMappingURL=categoryService.d.ts.map