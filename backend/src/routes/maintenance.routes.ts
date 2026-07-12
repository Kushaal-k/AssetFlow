import { Router } from "express";
import {
    createMaintenance,
    updateMaintenanceStatus,
    fetchMaintenance
} from "../controllers/maintenance.controller.js";

const router = Router();

router.get('/', fetchMaintenance);
router.post('/', createMaintenance);
router.patch('/:id/status', updateMaintenanceStatus);

export default router;
