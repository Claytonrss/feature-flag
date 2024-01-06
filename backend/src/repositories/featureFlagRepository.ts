import { openDb } from "../database/database";

export async function getAll() {
  const db = await openDb();
  return await db.all("SELECT * FROM feature_flags");
}

export async function update(name: string, status: boolean) {
  const db = await openDb();
  return db.run("UPDATE feature_flags SET status = ? WHERE name = ?", [status, name]);
}
