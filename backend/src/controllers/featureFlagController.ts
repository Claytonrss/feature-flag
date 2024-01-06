import { Request, Response } from "express";
import * as featureFlagService from "./../services/featureFlagService";
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function getAllFlags(db: Database<sqlite3.Database, sqlite3.Statement>, req: Request, res: Response) {
  try {
    const flags = await featureFlagService.getAllFeatureFlags(db);
    res.json(flags);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateFeatureFlag(db: Database<sqlite3.Database, sqlite3.Statement>, req: Request, res: Response) {
  const { name, status } = req.body;
  if (name === undefined || status === undefined) {
    return res.status(400).json({ error: "Nome e estado da flag são obrigatórios" });
  }

  try {
    const result = await featureFlagService.updateFeatureFlag(db, name, status);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Feature flag não encontrada" });
    }
    res.status(200).json({ message: "Feature flag atualizada com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
