import express from "express";
import cors from "cors";
import { router as featureFlagsRouter } from "./routes/featureFlags";
import { openDb } from "./database/database";
import * as dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3001;
const envFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
dotenv.config({ path: envFile });

if (!process.env.ALLOWED_ORIGINS) {
  throw new Error(
    "A variável ALLOWED_ORIGINS não está definida no arquivo .env"
  );
}

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use("/feature-flags", featureFlagsRouter);

openDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
