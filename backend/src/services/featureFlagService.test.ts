import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { initializeTables, insertDefaultFlags } from './../database/database';
import * as featureFlagRepository from './../repositories/featureFlagRepository';
import * as featureFlagService from './featureFlagService';

describe('FeatureFlag Service', () => {
  let db: Database<sqlite3.Database, sqlite3.Statement>;

  beforeAll(async () => {
    db = await open({
      filename: ':memory:',
      driver: sqlite3.Database,
    });
    await initializeTables(db);
    await insertDefaultFlags(db);
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
