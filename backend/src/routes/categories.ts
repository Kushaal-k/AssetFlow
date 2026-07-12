import { Router } from 'express';
import type { Request, Response } from 'express';
import { CategoryError, createCategoryService } from '../services/categoryService.js';
import type { CategoryRepository } from '../types/category.js';

export function createCategoryRouter(categoryRepository: CategoryRepository) {
  const router = Router();
  const categoryService = createCategoryService(categoryRepository);

  router.get('/', async (_req: Request, res: Response) => {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      handleCategoryError(error, res);
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id as string);
      return res.status(200).json(category);
    } catch (error) {
      handleCategoryError(error, res);
    }
  });

  router.post('/', async (req: Request, res: Response) => {
    try {
      const category = await categoryService.createCategory(req.body);
      return res.status(201).json(category);
    } catch (error) {
      handleCategoryError(error, res);
    }
  });

  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const category = await categoryService.updateCategory(req.params.id as string, req.body);
      return res.status(200).json(category);
    } catch (error) {
      handleCategoryError(error, res);
    }
  });

  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await categoryService.deleteCategory(req.params.id as string);
      return res.status(204).send();
    } catch (error) {
      handleCategoryError(error, res);
    }
  });

  return router;
}

function handleCategoryError(error: unknown, res: Response) {
  if (error instanceof CategoryError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  console.error('Category route error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
