import { Router } from 'express';
import type { Request, Response } from 'express';
import { AuthError, createAuthService } from '../services/authService.js';
import type { UserRepository } from '../types/user.js';

export function createAuthRouter(userRepository: UserRepository) {
  const router = Router();
  const authService = createAuthService(userRepository);

  router.post('/signup', async (req: Request, res: Response) => {
    try {
      const result = await authService.signup(req.body);
      res.status(201).json(result);
    } catch (error) {
      handleAuthError(error, res);
    }
  });

  router.post('/login', async (req: Request, res: Response) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      handleAuthError(error, res);
    }
  });

  return router;
}

function handleAuthError(error: unknown, res: Response) {
  if (error instanceof AuthError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  console.error('Auth route error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
