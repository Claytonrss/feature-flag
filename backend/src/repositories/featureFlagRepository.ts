import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function getAll(db: Database<sqlite3.Database, sqlite3.Statement>) {
  return await db.all("SELECT * FROM feature_flags");
}

export async function update(db: Database<sqlite3.Database, sqlite3.Statement>, name: string, status: boolean) {
  return db.run("UPDATE feature_flags SET status = ? WHERE name = ?", [status, name]);
}
