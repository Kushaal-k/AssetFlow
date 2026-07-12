import { createPrismaDepartmentRepository } from './prismaDepartmentRepository.js';
export function createDepartmentRepository() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is required for Department repository. No in-memory fallback is available.');
    }
    return createPrismaDepartmentRepository();
}
//# sourceMappingURL=departmentRepository.js.map