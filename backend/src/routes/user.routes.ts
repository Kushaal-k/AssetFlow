import { Router } from "express";
import { fetchUsers, updateUserRole } from "../controllers/user.controller.js";

const router = Router();

router.get('/', fetchUsers);
router.patch('/:id/role', updateUserRole);

export default router;
