import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const openDb = async () => {
  const db = await open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS feature_flags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      status BOOLEAN
    )`);

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

  return db;
};
