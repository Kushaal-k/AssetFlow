import type { Role } from '@prisma/client';
export interface PublicUser {
    id: string;
    name: string;
    email: string;
    role: Role;
}
export interface UserRecord extends PublicUser {
    passwordHash: string;
}
export interface CreateUserInput {
    name: string;
    email: string;
    passwordHash: string;
}
export interface UserRepository {
    findByEmail(email: string): Promise<UserRecord | null>;
    create(input: CreateUserInput): Promise<UserRecord>;
}
export declare function toPublicUser(user: UserRecord): PublicUser;
//# sourceMappingURL=user.d.ts.map