"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbService_1 = require("./dbService");
const sqlite_1 = require("sqlite");
describe('dbService', () => {
    let originalDatabaseFilename;
    beforeAll(() => {
        originalDatabaseFilename = process.env.DATABASE_FILENAME;
    });
    beforeEach(() => {
        jest.resetModules();
    });
    afterAll(async () => {
        process.env.DATABASE_FILENAME = originalDatabaseFilename;
        const db = await (0, dbService_1.getDb)();
        if (db) {
            await db.close();
        }
    });
    test('getDb returns a database instance', async () => {
        process.env.DATABASE_FILENAME = ':memory:';
        const db = await (0, dbService_1.getDb)();
        expect(db).toBeInstanceOf(sqlite_1.Database);
    });
    test('getDb reuses the existing database instance', async () => {
        process.env.DATABASE_FILENAME = ':memory:';
        const firstInstance = await (0, dbService_1.getDb)();
        const secondInstance = await (0, dbService_1.getDb)();
        expect(secondInstance).toBe(firstInstance);
    });
    test('getDb throws an error when DATABASE_FILENAME is not set', async () => {
        const { getDb } = require('./dbService'); // Re-importa para resetar o estado do módulo
        delete process.env.DATABASE_FILENAME;
        await expect(getDb()).rejects.toThrow("A variável DATABASE_FILENAME não está definida no arquivo .env");
    });
});
