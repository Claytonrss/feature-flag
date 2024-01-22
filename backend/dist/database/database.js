"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDb = exports.insertDefaultFlags = exports.initializeTables = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const initializeTables = async (db) => {
    await db.exec(`CREATE TABLE IF NOT EXISTS feature_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    status BOOLEAN
  )`);
};
exports.initializeTables = initializeTables;
const insertDefaultFlags = async (db) => {
    const defaultFlags = [
        { name: "isBlackFair", status: true },
        { name: "isNewCard", status: false },
    ];
    for (const flag of defaultFlags) {
        const existingFlag = await db.get(`SELECT * FROM feature_flags WHERE name = ?`, flag.name);
        if (!existingFlag) {
            await db.run(`INSERT INTO feature_flags (name, status) VALUES (?, ?)`, [
                flag.name,
                flag.status,
            ]);
        }
    }
};
exports.insertDefaultFlags = insertDefaultFlags;
const openDb = async (databaseFilename) => {
    const db = await (0, sqlite_1.open)({
        filename: databaseFilename,
        driver: sqlite3_1.default.Database,
    });
    await (0, exports.initializeTables)(db);
    await (0, exports.insertDefaultFlags)(db);
    return db;
};
exports.openDb = openDb;
