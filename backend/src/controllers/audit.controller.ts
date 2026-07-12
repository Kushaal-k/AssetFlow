import type { Request, Response } from "express";
import {
    createAuditCycleService,
    fetchAuditCyclesService,
    recordAuditItemService,
    closeAuditCycleService
} from "../services/audit.service.js";
import type { ICreateAuditCycleInput, IRecordAuditItemInput, AuditItemStatus } from "../types/types.js";

const createAuditCycle = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Missing required field: name" });
        }

        const input: ICreateAuditCycleInput = { name };
        const cycle = await createAuditCycleService(input);
        
        return res.status(201).json(cycle);
    } catch (error) {
        console.error("Error creating audit cycle:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const fetchAuditCycles = async (req: Request, res: Response) => {
    try {
        const cycles = await fetchAuditCyclesService();
        return res.status(200).json(cycles);
    } catch (error) {
        console.error("Error fetching audit cycles:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const recordAuditItem = async (req: Request, res: Response) => {
    try {
        const cycleId = req.params.cycleId as string;
        const { assetId, auditorId, status, notes } = req.body;

        if (!assetId || !auditorId || !status) {
            return res.status(400).json({ error: "Missing required fields: assetId, auditorId, status" });
        }

        const validStatuses = ['VERIFIED', 'MISSING', 'DAMAGED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        }

        const input: IRecordAuditItemInput = {
            cycleId,
            assetId,
            auditorId,
            status: status as AuditItemStatus,
            notes
        };

        const record = await recordAuditItemService(input);
        return res.status(200).json(record);
    } catch (error) {
        console.error("Error recording audit item:", error);
        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes("closed audit cycle")) {
                return res.status(409).json({ error: error.message });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const closeAuditCycle = async (req: Request, res: Response) => {
    try {
        const cycleId = req.params.cycleId as string;
        const { closingUserId } = req.body;

        if (!closingUserId) {
            return res.status(400).json({ error: "Missing required field: closingUserId" });
        }

        const result = await closeAuditCycleService(cycleId, closingUserId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error closing audit cycle:", error);
        if (error instanceof Error) {
            if (error.message.includes("not found")) {
                return res.status(404).json({ error: error.message });
            }
            if (error.message.includes("already closed")) {
                return res.status(409).json({ error: error.message });
            }
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    createAuditCycle,
    fetchAuditCycles,
    recordAuditItem,
    closeAuditCycle
};
