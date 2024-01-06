import express from "express";
import * as featureFlagController from "./featureFlagController";
import * as featureFlagService from "./../services/featureFlagService";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { initializeTables, insertDefaultFlags } from "./../database/database";
import request from "supertest";

describe("FeatureFlag Controller", () => {
  let app: express.Express;
  let db: Database<sqlite3.Database, sqlite3.Statement>;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    db = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });

    await initializeTables(db);
    await insertDefaultFlags(db);

    // Injetando dependências
    app.get("/feature-flags", (req, res) =>
      featureFlagController.getAllFlags(db, req, res)
    );
    app.post("/feature-flags", (req, res) =>
      featureFlagController.updateFeatureFlag(db, req, res)
    );
  });

  test("GET /feature-flags should retrieve all flags", async () => {
    const response = await request(app).get("/feature-flags");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("POST /feature-flags should update a flag", async () => {
    const response = await request(app)
      .post("/feature-flags")
      .send({ name: "isBlackFair", status: false });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(
      "Feature flag atualizada com sucesso"
    );
  });

  test("GET /feature-flags fails to retrieve flags", async () => {
    jest
      .spyOn(featureFlagService, "getAllFeatureFlags")
      .mockImplementation(() =>
        Promise.reject(new Error("Falha ao buscar flags"))
      );
    const response = await request(app).get("/feature-flags");
    expect(response.status).toBe(500);
    expect(response.body.error).toEqual("Falha ao buscar flags");
  });

  test("POST /feature-flags to update a non-existent flag", async () => {
    const response = await request(app)
      .post("/feature-flags")
      .send({ name: "nonExistentFlag", status: true });
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual("Feature flag não encontrada");
  });

  test("POST /feature-flags with invalid data", async () => {
    const response = await request(app)
      .post("/feature-flags")
      .send({ name: "isBlackFair" }); // Faltando 'status'
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual(
      "Nome e estado da flag são obrigatórios"
    );
  });

  test("POST /feature-flags fails to update flag", async () => {
    jest
      .spyOn(featureFlagService, "updateFeatureFlag")
      .mockImplementation(() =>
        Promise.reject(new Error("Falha ao atualizar flag"))
      );
    const response = await request(app)
      .post("/feature-flags")
      .send({ name: "isBlackFair", status: false });
    expect(response.status).toBe(500);
    expect(response.body.error).toEqual("Falha ao atualizar flag");
  });

  afterAll(async () => {
    await db.close();
  });
});
