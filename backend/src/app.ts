import express from "express";
import cors from "cors";
import { router as featureFlagsRouter } from "./routes/featureFlags";
import { ALLOWED_ORIGINS } from "./utils/config";

const app = express();

const options: cors.CorsOptions = {
  origin: ALLOWED_ORIGINS,
};

app.use(cors(options));
app.use(express.json());
app.use("/feature-flags", featureFlagsRouter);

export default app;
