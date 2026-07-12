import type { UserRepository } from './types/user.js';
import type { DepartmentRepository } from './types/department.js';
import type { CategoryRepository } from './types/category.js';
export interface AppOptions {
    userRepository?: UserRepository;
    departmentRepository?: DepartmentRepository;
    categoryRepository?: CategoryRepository;
}
export declare function createApp(options?: AppOptions): import("express-serve-static-core").Express;
//# sourceMappingURL=index.d.ts.map