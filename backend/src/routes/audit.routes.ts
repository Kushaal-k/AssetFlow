import { Router } from "express";
import {
    createAuditCycle,
    fetchAuditCycles,
    recordAuditItem,
    closeAuditCycle
} from "../controllers/audit.controller.js";

const router = Router();

router.get('/', fetchAuditCycles);
router.post('/', createAuditCycle);
router.post('/:cycleId/record', recordAuditItem);
router.post('/:cycleId/close', closeAuditCycle);

export default router;
