"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeatureFlag = exports.getAllFlags = void 0;
const featureFlagService = __importStar(require("./../services/featureFlagService"));
async function getAllFlags(db, req, res) {
    try {
        const flags = await featureFlagService.getAllFeatureFlags(db);
        res.json(flags);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getAllFlags = getAllFlags;
async function updateFeatureFlag(db, req, res) {
    const { name, status } = req.body;
    if (name === undefined || status === undefined) {
        return res.status(400).json({ error: "Nome e estado da flag são obrigatórios" });
    }
    try {
        const result = await featureFlagService.updateFeatureFlag(db, name, status);
        if (result.changes === 0) {
            return res.status(404).json({ error: "Feature flag não encontrada" });
        }
        res.status(200).json({ message: "Feature flag atualizada com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.updateFeatureFlag = updateFeatureFlag;
