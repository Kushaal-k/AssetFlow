import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

import { createAuthRouter } from './routes/auth.js';
import { createDepartmentRouter } from './routes/departments.js';
import { createCategoryRouter } from './routes/categories.js';
import { createUserRepository } from './repositories/userRepository.js';
import { createDepartmentRepository } from './repositories/departmentRepository.js';
import { createCategoryRepository } from './repositories/categoryRepository.js';

import type { UserRepository } from './types/user.js';
import type { DepartmentRepository } from './types/department.js';
import type { CategoryRepository } from './types/category.js';

import allocationRouter from './routes/allocation.routes.js';
import transferRouter from './routes/transfer.routes.js';
import bookingRouter from './routes/booking.routes.js';
import maintenanceRouter from './routes/maintenance.routes.js';
import auditRouter from './routes/audit.routes.js';
import userRouter from './routes/user.routes.js';
import assetRouter from './routes/asset.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';

dotenv.config();

export interface AppOptions {
  userRepository?: UserRepository;
  departmentRepository?: DepartmentRepository;
  categoryRepository?: CategoryRepository;
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

  // Department and Category routes require a database connection.
  // They are mounted only when a repository is explicitly provided
  // or when DATABASE_URL is configured.
  if (options.departmentRepository || process.env.DATABASE_URL) {
    const departmentRepository = options.departmentRepository ?? createDepartmentRepository();
    app.use('/api/departments', createDepartmentRouter(departmentRepository));
  }

  if (options.categoryRepository || process.env.DATABASE_URL) {
    const categoryRepository = options.categoryRepository ?? createCategoryRepository();
    app.use('/api/categories', createCategoryRouter(categoryRepository));
  }

  app.use('/api/allocations', allocationRouter);
  app.use('/api/transfers', transferRouter);
  app.use('/api/bookings', bookingRouter);
  app.use('/api/maintenance', maintenanceRouter);
  app.use('/api/audits', auditRouter);
  app.use('/api/users', userRouter);
  app.use('/api/assets', assetRouter);
  app.use('/api/dashboard', dashboardRouter);

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
