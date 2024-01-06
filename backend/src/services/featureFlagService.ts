import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import * as featureFlagRepository from "../repositories/featureFlagRepository";

export async function getAllFeatureFlags(
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  return await featureFlagRepository.getAll(db);
}

export async function updateFeatureFlag(
  db: Database<sqlite3.Database, sqlite3.Statement>,
  name: string,
  status: boolean
) {
  return await featureFlagRepository.update(db, name, status);
}
