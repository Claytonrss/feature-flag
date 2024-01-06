import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

export const initializeTables = async (
  db: Database<sqlite3.Database, sqlite3.Statement>
) => {
  await db.exec(`CREATE TABLE IF NOT EXISTS feature_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    status BOOLEAN
  )`);
};

export const insertDefaultFlags = async (
  db: Database<sqlite3.Database, sqlite3.Statement>
) => {
  const defaultFlags = [
    { name: "isBlackFair", status: true },
    { name: "isNewCard", status: false },
  ];

  for (const flag of defaultFlags) {
    const existingFlag = await db.get(
      `SELECT * FROM feature_flags WHERE name = ?`,
      flag.name
    );
    if (!existingFlag) {
      await db.run(`INSERT INTO feature_flags (name, status) VALUES (?, ?)`, [
        flag.name,
        flag.status,
      ]);
    }
  }
};

export const openDb = async (databaseFilename: string) => {
  const db = await open({
    filename: databaseFilename,
    driver: sqlite3.Database,
  });

  await initializeTables(db);
  await insertDefaultFlags(db);

  return db;
};
