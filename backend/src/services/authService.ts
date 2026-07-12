import bcrypt from 'bcryptjs';
import { signToken } from '../lib/jwt.js';
import type { PublicUser, UserRepository } from '../types/user.js';
import { toPublicUser } from '../types/user.js';

const MIN_PASSWORD_LENGTH = 6;

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

export class AuthError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function validateSignupInput(input: SignupInput): SignupInput {
  const name = input.name?.trim();
  const email = normalizeEmail(input.email ?? '');
  const password = input.password ?? '';

  if (!name) {
    throw new AuthError('Name is required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new AuthError('Valid email is required', 400);
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new AuthError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`, 400);
  }

  return { name, email, password };
}

function validateLoginInput(input: LoginInput): LoginInput {
  const email = normalizeEmail(input.email ?? '');
  const password = input.password ?? '';

  if (!email || !password) {
    throw new AuthError('Email and password are required', 400);
  }

  return { email, password };
}

export function createAuthService(userRepository: UserRepository) {
  return {
    async signup(input: SignupInput): Promise<AuthResult> {
      const { name, email, password } = validateSignupInput(input);

      const passwordHash = await bcrypt.hash(password, 10);

      try {
        const user = await userRepository.create({ name, email, passwordHash });
        const publicUser = toPublicUser(user);

        return {
          token: signToken(publicUser),
          user: publicUser,
        };
      } catch (error) {
        if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
          throw new AuthError('Email already registered', 409);
        }

        throw error;
      }
    },

    async login(input: LoginInput): Promise<AuthResult> {
      const { email, password } = validateLoginInput(input);

      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new AuthError('Invalid email or password', 401);
      }

      const passwordMatches = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatches) {
        throw new AuthError('Invalid email or password', 401);
      }

      const publicUser = toPublicUser(user);

      return {
        token: signToken(publicUser),
        user: publicUser,
      };
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;
