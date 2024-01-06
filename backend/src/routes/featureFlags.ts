import { Router } from "express";
import {
  getAllFlags,
  updateFeatureFlag,
} from "../controllers/featureFlagController";
import { getDb } from "../services/dbService";

const router = Router();

router.get("/", async (req, res) => {
  const db = await getDb();
  getAllFlags(db, req, res);
});
router.post("/", async (req, res) => {
  const db = await getDb();
  updateFeatureFlag(db, req, res);
});

export { router };
