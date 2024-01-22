"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const config_1 = require("../utils/config");
let db = null;
const getDb = async () => {
    if (db)
        return db;
    db = await (0, sqlite_1.open)({
        filename: config_1.DATABASE_FILENAME,
        driver: sqlite3_1.default.Database
    });
    return db;
};
exports.getDb = getDb;
