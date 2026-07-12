import { Router } from "express";
import { createAllocation, returnAllocation } from "../controllers/allocation.controller.js";

const router = Router();

router.post('/', createAllocation);
router.post('/:id/return', returnAllocation);

export default router;