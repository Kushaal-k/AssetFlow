import type { PublicUser } from '../types/user.js';
export interface JwtPayload {
    userId: string;
    email: string;
    role: PublicUser['role'];
}
export declare function signToken(user: PublicUser): string;
export declare function verifyToken(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map