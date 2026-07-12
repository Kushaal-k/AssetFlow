import type { Request, Response } from "express";
import {
    createMaintenanceService,
    updateMaintenanceStatusService,
    fetchMaintenanceService
} from "../services/maintenance.service.js";
import type { ICreateMaintenanceInput, IFetchMaintenanceQuery, MaintenancePriority, MaintenanceStatus } from "../types/types.js";

const createMaintenance = async (req: Request, res: Response) => {
    try {
        const { assetId, raisedById, issueDescription, priority } = req.body;

        if (!assetId || !raisedById || !issueDescription || !priority) {
            return res.status(400).json({ error: "Missing required fields: assetId, raisedById, issueDescription, priority" });
        }

        // Basic priority validation
        const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` });
        }

        const input: ICreateMaintenanceInput = {
            assetId,
            raisedById,
            issueDescription,
            priority: priority as MaintenancePriority
        };

        const request = await createMaintenanceService(input);
        return res.status(201).json(request);
    } catch (error) {
        console.error("Error creating maintenance request:", error);
        if (error instanceof Error && error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateMaintenanceStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Missing required field: status" });
        }

        const result = await updateMaintenanceStatusService(id, status as MaintenanceStatus);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error updating maintenance status:", error);
        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes("Cannot transition")) {
                return res.status(409).json({ error: error.message });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const fetchMaintenance = async (req: Request, res: Response) => {
    try {
        const { assetId, status, priority } = req.query;

        const query: IFetchMaintenanceQuery = {};
        if (assetId) query.assetId = assetId as string;
        if (status) query.status = status as MaintenanceStatus;
        if (priority) query.priority = priority as MaintenancePriority;

        const requests = await fetchMaintenanceService(query);
        return res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching maintenance requests:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    createMaintenance,
    updateMaintenanceStatus,
    fetchMaintenance
};
