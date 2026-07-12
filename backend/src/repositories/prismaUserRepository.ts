import { PrismaClient } from '@prisma/client';
import type { CreateUserInput, UserRecord, UserRepository } from '../types/user.js';

let prisma: PrismaClient | undefined;

function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
}

export function createPrismaUserRepository(): UserRepository {
  const client = getPrismaClient();

  return {
    async findByEmail(email) {
      const user = await client.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      };
    },

    async create(input) {
      try {
        const user = await client.user.create({
          data: {
            name: input.name,
            email: input.email.toLowerCase(),
            passwordHash: input.passwordHash,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          passwordHash: user.passwordHash,
          role: user.role,
        };
      } catch (error) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          error.code === 'P2002'
        ) {
          throw new Error('EMAIL_EXISTS');
        }

        throw error;
      }
    },
  };
}
