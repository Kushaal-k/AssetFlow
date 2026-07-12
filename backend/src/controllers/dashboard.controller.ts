import type { Request, Response } from "express";
import { fetchDashboardStatsService } from "../services/dashboard.service.js";

const fetchDashboardStats = async (req: Request, res: Response) => {
    try {
        const stats = await fetchDashboardStatsService();
        return res.status(200).json(stats);
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    fetchDashboardStats
};
