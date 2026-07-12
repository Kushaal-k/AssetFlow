import jwt from 'jsonwebtoken';
import type { PublicUser } from '../types/user.js';

const DEFAULT_SECRET = 'assetflow-dev-secret-change-in-production';
const TOKEN_EXPIRY = '7d';

function getJwtSecret(): string {
  return process.env.JWT_SECRET ?? DEFAULT_SECRET;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: PublicUser['role'];
}

export function signToken(user: PublicUser): string {
  const payload: JwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
}
