import { createPrismaCategoryRepository } from './prismaCategoryRepository.js';
export function createCategoryRepository() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is required for Category repository. No in-memory fallback is available.');
    }
    return createPrismaCategoryRepository();
}
//# sourceMappingURL=categoryRepository.js.map