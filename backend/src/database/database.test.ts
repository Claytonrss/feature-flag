import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import { initializeTables, insertDefaultFlags } from "./database";

describe("Database Module", () => {
  let db: Database<sqlite3.Database, sqlite3.Statement>;

  beforeAll(async () => {
    db = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });
  });

  beforeEach(async () => {
    await db.exec("DROP TABLE IF EXISTS feature_flags");
    await initializeTables(db);
  });

  test("initializeTables creates the feature_flags table", async () => {
    await initializeTables(db);
    const result = await db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='feature_flags'"
    );
    expect(result).not.toBeNull();
  });

  test("insertDefaultFlags inserts the default flags", async () => {
    await insertDefaultFlags(db);
    const result = await db.all("SELECT * FROM feature_flags");
    expect(result).toHaveLength(2);
  });

  test("insertDefaultFlags does not duplicate flags", async () => {
    await insertDefaultFlags(db);
    await insertDefaultFlags(db);
    const result = await db.all("SELECT * FROM feature_flags");
    expect(result).toHaveLength(2);
  });

  test("initializeTables does not affect existing data", async () => {
    await db.run(`INSERT INTO feature_flags (name, status) VALUES (?, ?)`, [
      "existingFlag",
      true,
    ]);
    await initializeTables(db);
    const result = await db.get(
      "SELECT * FROM feature_flags WHERE name = ?",
      "existingFlag"
    );
    expect(result).not.toBeNull();
  });

  afterAll(async () => {
    await db.close();
  });
});
