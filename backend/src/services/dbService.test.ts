import { getDb } from './dbService';
import { Database } from 'sqlite';

describe('dbService', () => {
  let originalDatabaseFilename: string | undefined;

  beforeAll(() => {
    originalDatabaseFilename = process.env.DATABASE_FILENAME;
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(async () => {
    process.env.DATABASE_FILENAME = originalDatabaseFilename;
    const db = await getDb();
    if (db) {
      await db.close();
    }
  });

  test('getDb returns a database instance', async () => {
    process.env.DATABASE_FILENAME = ':memory:';
    const db = await getDb();
    expect(db).toBeInstanceOf(Database);
  });

  test('getDb reuses the existing database instance', async () => {
    process.env.DATABASE_FILENAME = ':memory:';
    const firstInstance = await getDb();
    const secondInstance = await getDb();
    expect(secondInstance).toBe(firstInstance);
  });

  test('getDb throws an error when DATABASE_FILENAME is not set', async () => {
    const { getDb } = require('./dbService'); // Re-importa para resetar o estado do módulo
    delete process.env.DATABASE_FILENAME;
    await expect(getDb()).rejects.toThrow("A variável DATABASE_FILENAME não está definida no arquivo .env");
  });
});
