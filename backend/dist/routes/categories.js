import { Router } from 'express';
import { CategoryError, createCategoryService } from '../services/categoryService.js';
export function createCategoryRouter(categoryRepository) {
    const router = Router();
    const categoryService = createCategoryService(categoryRepository);
    router.get('/', async (_req, res) => {
        try {
            const categories = await categoryService.getAllCategories();
            return res.status(200).json(categories);
        }
        catch (error) {
            handleCategoryError(error, res);
        }
    });
    router.get('/:id', async (req, res) => {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            return res.status(200).json(category);
        }
        catch (error) {
            handleCategoryError(error, res);
        }
    });
    router.post('/', async (req, res) => {
        try {
            const category = await categoryService.createCategory(req.body);
            return res.status(201).json(category);
        }
        catch (error) {
            handleCategoryError(error, res);
        }
    });
    router.put('/:id', async (req, res) => {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            return res.status(200).json(category);
        }
        catch (error) {
            handleCategoryError(error, res);
        }
    });
    router.delete('/:id', async (req, res) => {
        try {
            await categoryService.deleteCategory(req.params.id);
            return res.status(204).send();
        }
        catch (error) {
            handleCategoryError(error, res);
        }
    });
    return router;
}
function handleCategoryError(error, res) {
    if (error instanceof CategoryError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    console.error('Category route error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
//# sourceMappingURL=categories.js.map