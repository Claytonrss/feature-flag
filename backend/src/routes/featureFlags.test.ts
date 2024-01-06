import express from "express";
import request from "supertest";
import { router } from "./featureFlags";
import * as featureFlagController from "./../controllers/featureFlagController";
import { getDb } from "./../services/dbService";

jest.mock("./../services/dbService");

describe("FeatureFlags Routes", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(router);
  });

  test("GET /feature-flags calls getAllFlags controller", async () => {
    const getAllFlagsMock = jest
      .spyOn(featureFlagController, "getAllFlags")
      .mockImplementation((db, req, res) => {
        res.status(200).json([]); // Envia uma resposta
        return Promise.resolve();
      });

    await request(app).get("/feature-flags");
    expect(getAllFlagsMock).toHaveBeenCalled();
    getAllFlagsMock.mockRestore();
  });

  test("POST /feature-flags calls updateFeatureFlag controller", async () => {
    const mockResponse = {
      status: () => ({
        json: () => ({}),
      }),
    } as any;

    const updateFeatureFlagMock = jest
      .spyOn(featureFlagController, "updateFeatureFlag")
      .mockImplementation((db, req, res) => {
        res.status(200).json([]);
        return Promise.resolve(mockResponse);
      });
    await request(app)
      .post("/feature-flags")
      .send({ name: "isBlackFair", status: false });
    expect(updateFeatureFlagMock).toHaveBeenCalled();
    updateFeatureFlagMock.mockRestore();
  });

  afterAll(async () => {
    const db = await getDb();
    if (db) {
      await db.close();
    }
  });
});
