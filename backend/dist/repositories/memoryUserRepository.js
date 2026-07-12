import { randomUUID } from 'node:crypto';
export function createMemoryUserRepository() {
    const usersByEmail = new Map();
    return {
        async findByEmail(email) {
            return usersByEmail.get(email.toLowerCase()) ?? null;
        },
        async create(input) {
            const email = input.email.toLowerCase();
            if (usersByEmail.has(email)) {
                throw new Error('EMAIL_EXISTS');
            }
            const user = {
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
//# sourceMappingURL=memoryUserRepository.js.map