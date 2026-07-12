import { Router } from "express";
import { requestTransfer, approveTransfer, rejectTransfer, getPendingTransfers } from "../controllers/transfer.controller.js";

const router = Router();

router.get('/pending', getPendingTransfers);
router.post('/:id/request', requestTransfer);
router.post('/:id/approve', approveTransfer);
router.post('/:id/reject', rejectTransfer);

export default router;
