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
const featureFlagController = __importStar(require("./featureFlagController"));
const featureFlagService = __importStar(require("./../services/featureFlagService"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const database_1 = require("./../database/database");
const supertest_1 = __importDefault(require("supertest"));
describe("FeatureFlag Controller", () => {
    let app;
    let db;
    beforeAll(async () => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        db = await (0, sqlite_1.open)({
            filename: ":memory:",
            driver: sqlite3_1.default.Database,
        });
        await (0, database_1.initializeTables)(db);
        await (0, database_1.insertDefaultFlags)(db);
        app.get("/feature-flags", (req, res) => featureFlagController.getAllFlags(db, req, res));
        app.post("/feature-flags", (req, res) => featureFlagController.updateFeatureFlag(db, req, res));
    });
    test("GET /feature-flags should retrieve all flags", async () => {
        const response = await (0, supertest_1.default)(app).get("/feature-flags");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
    test("POST /feature-flags should update a flag", async () => {
        const response = await (0, supertest_1.default)(app)
            .post("/feature-flags")
            .send({ name: "isBlackFair", status: false });
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Feature flag atualizada com sucesso");
    });
    test("GET /feature-flags fails to retrieve flags", async () => {
        jest
            .spyOn(featureFlagService, "getAllFeatureFlags")
            .mockImplementation(() => Promise.reject(new Error("Falha ao buscar flags")));
        const response = await (0, supertest_1.default)(app).get("/feature-flags");
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual("Falha ao buscar flags");
    });
    test("POST /feature-flags to update a non-existent flag", async () => {
        const response = await (0, supertest_1.default)(app)
            .post("/feature-flags")
            .send({ name: "nonExistentFlag", status: true });
        expect(response.status).toBe(404);
        expect(response.body.error).toEqual("Feature flag não encontrada");
    });
    test("POST /feature-flags with invalid data", async () => {
        const response = await (0, supertest_1.default)(app)
            .post("/feature-flags")
            .send({ name: "isBlackFair" }); // Faltando 'status'
        expect(response.status).toBe(400);
        expect(response.body.error).toEqual("Nome e estado da flag são obrigatórios");
    });
    test("POST /feature-flags fails to update flag", async () => {
        jest
            .spyOn(featureFlagService, "updateFeatureFlag")
            .mockImplementation(() => Promise.reject(new Error("Falha ao atualizar flag")));
        const response = await (0, supertest_1.default)(app)
            .post("/feature-flags")
            .send({ name: "isBlackFair", status: false });
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual("Falha ao atualizar flag");
    });
    afterAll(async () => {
        await db.close();
    });
});
