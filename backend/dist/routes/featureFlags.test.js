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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const featureFlags_1 = require("./featureFlags");
const featureFlagController = __importStar(require("./../controllers/featureFlagController"));
const dbService_1 = require("./../services/dbService");
jest.mock("./../services/dbService");
describe("FeatureFlags Routes", () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(featureFlags_1.router);
    });
    test("GET /feature-flags calls getAllFlags controller", async () => {
        const getAllFlagsMock = jest
            .spyOn(featureFlagController, "getAllFlags")
            .mockImplementation((db, req, res) => {
            res.status(200).json([]); // Envia uma resposta
            return Promise.resolve();
        });
        await (0, supertest_1.default)(app).get("/feature-flags");
        expect(getAllFlagsMock).toHaveBeenCalled();
        getAllFlagsMock.mockRestore();
    });
    test("POST /feature-flags calls updateFeatureFlag controller", async () => {
        const mockResponse = {
            status: () => ({
                json: () => ({}),
            }),
        };
        const updateFeatureFlagMock = jest
            .spyOn(featureFlagController, "updateFeatureFlag")
            .mockImplementation((db, req, res) => {
            res.status(200).json([]);
            return Promise.resolve(mockResponse);
        });
        await (0, supertest_1.default)(app)
            .post("/feature-flags")
            .send({ name: "isBlackFair", status: false });
        expect(updateFeatureFlagMock).toHaveBeenCalled();
        updateFeatureFlagMock.mockRestore();
    });
    afterAll(async () => {
        const db = await (0, dbService_1.getDb)();
        if (db) {
            await db.close();
        }
    });
});
