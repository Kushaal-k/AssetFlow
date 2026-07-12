import type { UserRepository } from '../types/user.js';
import { createMemoryUserRepository } from './memoryUserRepository.js';
import { createPrismaUserRepository } from './prismaUserRepository.js';

export function createUserRepository(): UserRepository {
  if (process.env.DATABASE_URL) {
    return createPrismaUserRepository();
  }

  return createMemoryUserRepository();
}
