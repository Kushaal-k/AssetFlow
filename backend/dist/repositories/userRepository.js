import { createMemoryUserRepository } from './memoryUserRepository.js';
import { createPrismaUserRepository } from './prismaUserRepository.js';
export function createUserRepository() {
    if (process.env.DATABASE_URL) {
        return createPrismaUserRepository();
    }
    return createMemoryUserRepository();
}
//# sourceMappingURL=userRepository.js.map