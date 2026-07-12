import type { Request, Response } from "express";
import {
    requestTransferService,
    approveTransferService,
    rejectTransferService,
    getPendingTransfersService
} from "../services/transfer.service.js";

const requestTransfer = async (req: Request, res: Response) => {
    try {
        const allocationId = req.params.id as string;

        const result = await requestTransferService(allocationId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error requesting transfer:", error);
        if (error instanceof Error && error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof Error && error.message.includes("Cannot request transfer")) {
            return res.status(409).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const approveTransfer = async (req: Request, res: Response) => {
    try {
        const allocationId = req.params.id as string;
        const { newAssignedToId, newAssignedDeptId } = req.body;

        if (!newAssignedToId) {
            return res.status(400).json({ error: "newAssignedToId is required" });
        }

        const result = await approveTransferService(allocationId, { newAssignedToId, newAssignedDeptId });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error approving transfer:", error);
        if (error instanceof Error && error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof Error && error.message.includes("Cannot approve transfer")) {
            return res.status(409).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const rejectTransfer = async (req: Request, res: Response) => {
    try {
        const allocationId = req.params.id as string;

        const result = await rejectTransferService(allocationId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error rejecting transfer:", error);
        if (error instanceof Error && error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof Error && error.message.includes("Cannot reject transfer")) {
            return res.status(409).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getPendingTransfers = async (req: Request, res: Response) => {
    try {
        const transfers = await getPendingTransfersService();
        return res.status(200).json(transfers);
    } catch (error) {
        console.error("Error fetching pending transfers:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    requestTransfer,
    approveTransfer,
    rejectTransfer,
    getPendingTransfers
};
