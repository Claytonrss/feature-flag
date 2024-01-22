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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const database_1 = require("./../database/database");
const featureFlagRepository = __importStar(require("./../repositories/featureFlagRepository"));
const featureFlagService = __importStar(require("./featureFlagService"));
describe('FeatureFlag Service', () => {
    let db;
    beforeAll(async () => {
        db = await (0, sqlite_1.open)({
            filename: ':memory:',
            driver: sqlite3_1.default.Database,
        });
        await (0, database_1.initializeTables)(db);
        await (0, database_1.insertDefaultFlags)(db);
    });
    test('getAllFeatureFlags retrieves all flags', async () => {
        const flags = await featureFlagService.getAllFeatureFlags(db);
        expect(flags).toHaveLength(2);
    });
    test('updateFeatureFlag updates a flag', async () => {
        await featureFlagService.updateFeatureFlag(db, 'isBlackFair', false);
        const [flag] = await featureFlagRepository.getAll(db);
        expect(flag.status).toBe(0);
    });
    afterAll(async () => {
        await db.close();
    });
});
