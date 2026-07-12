import type { PublicUser, UserRepository } from '../types/user.js';
export interface AuthResult {
    token: string;
    user: PublicUser;
}
export interface SignupInput {
    name: string;
    email: string;
    password: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export declare class AuthError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare function createAuthService(userRepository: UserRepository): {
    signup(input: SignupInput): Promise<AuthResult>;
    login(input: LoginInput): Promise<AuthResult>;
};
export type AuthService = ReturnType<typeof createAuthService>;
//# sourceMappingURL=authService.d.ts.map