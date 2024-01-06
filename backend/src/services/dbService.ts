import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { DATABASE_FILENAME } from '../utils/config';

let db: Database | null = null;

export const getDb = async (): Promise<Database> => {
  if (db) return db;

  db = await open({
    filename: DATABASE_FILENAME,
    driver: sqlite3.Database
  });

  return db;
};
