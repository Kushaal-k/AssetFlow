export class CategoryError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CategoryError';
    }
}
export function createCategoryService(categoryRepository) {
    return {
        async getAllCategories() {
            return categoryRepository.findAll();
        },
        async getCategoryById(id) {
            const category = await categoryRepository.findById(id);
            if (!category) {
                throw new CategoryError('Category not found', 404);
            }
            return category;
        },
        async createCategory(input) {
            if (!input.name || input.name.trim() === '') {
                throw new CategoryError('Category name is required', 400);
            }
            const trimmedName = input.name.trim();
            const existing = await categoryRepository.findByName(trimmedName);
            if (existing) {
                throw new CategoryError(`Category with name '${trimmedName}' already exists`, 409);
            }
            const createInput = { name: trimmedName };
            if (input.attributes !== undefined)
                createInput.attributes = input.attributes;
            return categoryRepository.create(createInput);
        },
        async updateCategory(id, input) {
            const existing = await categoryRepository.findById(id);
            if (!existing) {
                throw new CategoryError('Category not found', 404);
            }
            let trimmedName;
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
            const updateData = {};
            if (trimmedName !== undefined)
                updateData.name = trimmedName;
            if (input.attributes !== undefined)
                updateData.attributes = input.attributes;
            return categoryRepository.update(id, updateData);
        },
        async deleteCategory(id) {
            const existing = await categoryRepository.findById(id);
            if (!existing) {
                throw new CategoryError('Category not found', 404);
            }
            await categoryRepository.delete(id);
        },
    };
}
//# sourceMappingURL=categoryService.js.map