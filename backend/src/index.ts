import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createAuthRouter } from './routes/auth.js';
import { createUserRepository } from './repositories/userRepository.js';
import type { UserRepository } from './types/user.js';

dotenv.config();

export interface AppOptions {
  userRepository?: UserRepository;
}

export function createApp(options: AppOptions = {}) {
  const app = express();
  const userRepository = options.userRepository ?? createUserRepository();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'AssetFlow API is running!' });
  });

  app.use('/api/auth', createAuthRouter(userRepository));

  return app;
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  const port = process.env.PORT || 5000;
  const app = createApp();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
