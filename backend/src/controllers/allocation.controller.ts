import type { Request, Response } from "express";
import { createAllocationService } from "../services/allocation.service.js"
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
        
    }catch(error){
        
    }
}
const transferAllocation = async  (req: Request, res: Response) => {
    try{
        
    }catch(error){
        
    }
}
const approveTransfer = async  (req: Request, res: Response) => {
    try{
        
    }catch(error){
        
    }
}

export {
    createAllocation,
    returnAllocation,
    transferAllocation,
    approveTransfer
}