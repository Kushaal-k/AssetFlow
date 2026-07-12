import { randomUUID } from 'node:crypto';
import type { CreateUserInput, UserRecord, UserRepository } from '../types/user.js';

export function createMemoryUserRepository(): UserRepository {
  const usersByEmail = new Map<string, UserRecord>();

  return {
    async findByEmail(email) {
      return usersByEmail.get(email.toLowerCase()) ?? null;
    },

    async create(input) {
      const email = input.email.toLowerCase();

      if (usersByEmail.has(email)) {
        throw new Error('EMAIL_EXISTS');
      }

      const user: UserRecord = {
        id: randomUUID(),
        name: input.name,
        email,
        passwordHash: input.passwordHash,
        role: 'EMPLOYEE',
      };

      usersByEmail.set(email, user);
      return user;
    },
  };
}
