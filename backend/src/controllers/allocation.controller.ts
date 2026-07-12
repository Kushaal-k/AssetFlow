import type { Request, Response } from "express";
import { createAllocationService, returnAllocationService, transferAllocationService, approveTransferService } from "../services/allocation.service.js"
import type { IAllocation } from "../types/types.js";

const createAllocation = async  (req: Request, res: Response) => {
    try{
        const {assetId, assignedToId, assignedDeptId, expectedReturnDate, notes} = req.body;
        
        const allocation = await createAllocationService({
            assetId,
            assignedToId,
            assignedDeptId,
            expectedReturnDate,
            notes
        });

        return res.status(201).json(allocation);
    }catch(error){
        console.error("Error creating allocation:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const returnAllocation = async  (req: Request, res: Response) => {
    try{
        const id = req.params.id as string;
        const { notes, condition } = req.body;

        const returned = await returnAllocationService(id, notes, condition);
        return res.status(200).json(returned);
    }catch(error){
        console.error("Error returning allocation:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
const transferAllocation = async  (req: Request, res: Response) => {
    try{
        const id = req.params.id as string;
        
        const result = await transferAllocationService(id);
        return res.status(200).json(result);
    }catch(error){
        console.error("Error transferring allocation:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
const approveTransfer = async  (req: Request, res: Response) => {
    try{
        const id = req.params.id as string;
        const { newAssignedToId, newAssignedDeptId } = req.body;
        
        const result = await approveTransferService(id, newAssignedToId, newAssignedDeptId);
        return res.status(200).json(result);
    }catch(error){
        console.error("Error approving transfer:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export {
    createAllocation,
    returnAllocation,
    transferAllocation,
    approveTransfer
}