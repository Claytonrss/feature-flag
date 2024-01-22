"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const featureFlagController_1 = require("../controllers/featureFlagController");
const dbService_1 = require("../services/dbService");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", async (req, res) => {
    const db = await (0, dbService_1.getDb)();
    (0, featureFlagController_1.getAllFlags)(db, req, res);
});
router.post("/", async (req, res) => {
    const db = await (0, dbService_1.getDb)();
    (0, featureFlagController_1.updateFeatureFlag)(db, req, res);
});
