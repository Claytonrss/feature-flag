import express from "express";
import { openDb } from "./database/database";

const app = express();
const PORT = 3001;

app.use(express.json());

openDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Servidor rodando!");
  });

  app.get("/feature-flags", async (req, res) => {
    try {
      const db = await openDb();
      const flags = await db.all("SELECT * FROM feature_flags");
      res.json(flags);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/feature-flags", async (req, res) => {
    const { name, status } = req.body;

    if (name === undefined || status === undefined) {
      return res
        .status(400)
        .json({ error: "Nome e estado da flag são obrigatórios" });
    }

    try {
      const db = await openDb();
      const result = await db.run(
        "UPDATE feature_flags SET status = ? WHERE name = ?",
        [status, name]
      );

      if (result.changes === 0) {
        return res.status(404).json({ error: "Feature flag não encontrada" });
      }

      res.status(200).json({ message: "Feature flag atualizada com sucesso" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
});
