import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { initializeTables, insertDefaultFlags } from "./../database/database";
import * as featureFlagRepository from "./featureFlagRepository";

describe("FeatureFlag Repository", () => {
  let db: Database<sqlite3.Database, sqlite3.Statement>;

  beforeAll(async () => {
    db = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });
    await initializeTables(db);
    await insertDefaultFlags(db);
  });

  test("getAll returns all feature flags", async () => {
    const flags = await featureFlagRepository.getAll(db);
    expect(flags).toHaveLength(2); 
  });

  test("update changes the status of a feature flag", async () => {
    await featureFlagRepository.update(db, "isBlackFair", false);
    const [flag] = await db.all(
      "SELECT * FROM feature_flags WHERE name = ?",
      "isBlackFair"
    );
    expect(flag.status).toBe(0); 
  });

  afterAll(async () => {
    await db.close();
  });
});
