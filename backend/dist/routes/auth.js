import { Router } from 'express';
import { AuthError, createAuthService } from '../services/authService.js';
export function createAuthRouter(userRepository) {
    const router = Router();
    const authService = createAuthService(userRepository);
    router.post('/signup', async (req, res) => {
        try {
            const result = await authService.signup(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            handleAuthError(error, res);
        }
    });
    router.post('/login', async (req, res) => {
        try {
            const result = await authService.login(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            handleAuthError(error, res);
        }
    });
    return router;
}
function handleAuthError(error, res) {
    if (error instanceof AuthError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    console.error('Auth route error:', error);
    res.status(500).json({ error: 'Internal server error' });
}
//# sourceMappingURL=auth.js.map