import { Router } from "express";
import { fetchDashboardStats } from "../controllers/dashboard.controller.js";

const router = Router();

router.get('/', fetchDashboardStats);

export default router;
