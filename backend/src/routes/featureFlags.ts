import { Router } from "express";
import { getAllFlags, updateFeatureFlag } from "../controllers/featureFlagController";

const router = Router();

router.get("/", getAllFlags);
router.post("/", updateFeatureFlag);

export { router };
