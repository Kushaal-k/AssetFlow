import type { Request, Response } from "express";
import { fetchAssetsService, registerAssetService } from "../services/asset.service.js";
import type { IFetchAssetsQuery, ICreateAssetInput } from "../types/types.js";

const fetchAssets = async (req: Request, res: Response) => {
    try {
        const query: IFetchAssetsQuery = {
            search: req.query.search as string,
            categoryId: req.query.categoryId as string,
            departmentId: req.query.departmentId as string,
            status: req.query.status as string
        };

        const assets = await fetchAssetsService(query);
        return res.status(200).json(assets);
    } catch (error) {
        console.error("Error fetching assets:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const registerAsset = async (req: Request, res: Response) => {
    try {
        console.log("CREATE ASSET BODY:", req.body);
        const { name, categoryId, departmentId, serialNumber, condition, isBookable } = req.body;

        if (!name || !categoryId) {
            return res.status(400).json({ error: "Missing required fields: name, categoryId" });
        }

        const input: ICreateAssetInput = {
            name,
            categoryId,
            departmentId,
            serialNumber,
            condition,
            isBookable
        };

        const newAsset = await registerAssetService(input);
        return res.status(201).json(newAsset);
    } catch (error) {
        console.error("Error registering asset:", error);
        if (error instanceof Error && error.message === "Category not found") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    fetchAssets,
    registerAsset
};
