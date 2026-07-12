import { Router } from "express";
import { fetchAssets, registerAsset } from "../controllers/asset.controller.js";

const router = Router();

router.get('/', fetchAssets);
router.post('/', registerAsset);

export default router;
