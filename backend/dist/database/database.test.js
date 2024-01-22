"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const database_1 = require("./database");
describe("Database Module", () => {
    let db;
    beforeAll(async () => {
        db = await (0, sqlite_1.open)({
            filename: ":memory:",
            driver: sqlite3_1.default.Database,
        });
    });
    beforeEach(async () => {
        await db.exec("DROP TABLE IF EXISTS feature_flags");
        await (0, database_1.initializeTables)(db);
    });
    test("initializeTables creates the feature_flags table", async () => {
        await (0, database_1.initializeTables)(db);
        const result = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='feature_flags'");
        expect(result).not.toBeNull();
    });
    test("insertDefaultFlags inserts the default flags", async () => {
        await (0, database_1.insertDefaultFlags)(db);
        const result = await db.all("SELECT * FROM feature_flags");
        expect(result).toHaveLength(2);
    });
    test("insertDefaultFlags does not duplicate flags", async () => {
        await (0, database_1.insertDefaultFlags)(db);
        await (0, database_1.insertDefaultFlags)(db);
        const result = await db.all("SELECT * FROM feature_flags");
        expect(result).toHaveLength(2);
    });
    test("initializeTables does not affect existing data", async () => {
        await db.run(`INSERT INTO feature_flags (name, status) VALUES (?, ?)`, [
            "existingFlag",
            true,
        ]);
        await (0, database_1.initializeTables)(db);
        const result = await db.get("SELECT * FROM feature_flags WHERE name = ?", "existingFlag");
        expect(result).not.toBeNull();
    });
    afterAll(async () => {
        await db.close();
    });
});
