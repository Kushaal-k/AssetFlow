import { getPrismaClient } from '../lib/prisma.js';
export function createPrismaUserRepository() {
    const client = getPrismaClient();
    return {
        async findByEmail(email) {
            const user = await client.user.findUnique({
                where: { email: email.toLowerCase() },
            });
            if (!user) {
                return null;
            }
            return user;
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
                return user;
            }
            catch (error) {
                if (typeof error === 'object' &&
                    error !== null &&
                    'code' in error &&
                    error.code === 'P2002') {
                    throw new Error('EMAIL_EXISTS', { cause: error });
                }
                throw error;
            }
        },
    };
}
//# sourceMappingURL=prismaUserRepository.js.map