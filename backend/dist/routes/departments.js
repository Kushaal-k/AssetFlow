import { Router } from 'express';
import { DepartmentError, createDepartmentService } from '../services/departmentService.js';
export function createDepartmentRouter(departmentRepository) {
    const router = Router();
    const departmentService = createDepartmentService(departmentRepository);
    router.get('/', async (_req, res) => {
        try {
            const departments = await departmentService.getAllDepartments();
            return res.status(200).json(departments);
        }
        catch (error) {
            handleDepartmentError(error, res);
        }
    });
    router.get('/:id', async (req, res) => {
        try {
            const department = await departmentService.getDepartmentById(req.params.id);
            return res.status(200).json(department);
        }
        catch (error) {
            handleDepartmentError(error, res);
        }
    });
    router.post('/', async (req, res) => {
        try {
            const department = await departmentService.createDepartment(req.body);
            return res.status(201).json(department);
        }
        catch (error) {
            handleDepartmentError(error, res);
        }
    });
    router.put('/:id', async (req, res) => {
        try {
            const department = await departmentService.updateDepartment(req.params.id, req.body);
            return res.status(200).json(department);
        }
        catch (error) {
            handleDepartmentError(error, res);
        }
    });
    router.delete('/:id', async (req, res) => {
        try {
            await departmentService.deleteDepartment(req.params.id);
            return res.status(204).send();
        }
        catch (error) {
            handleDepartmentError(error, res);
        }
    });
    return router;
}
function handleDepartmentError(error, res) {
    if (error instanceof DepartmentError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    console.error('Department route error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
//# sourceMappingURL=departments.js.map