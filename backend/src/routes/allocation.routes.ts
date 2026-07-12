import { Router } from "express";
import { createAllocation , returnAllocation, transferAllocation, approveTransfer } from "../controllers/allocation.controller.js";

const router = Router();

router.post('/', createAllocation);
router.post('/:id/return', returnAllocation);
router.post('/:id/transfer-request', transferAllocation);
router.post('/:id/approve-transfer', approveTransfer);

export default router;