import * as dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
dotenv.config({ path: envFile });

if (!process.env.PORT || !process.env.ALLOWED_ORIGINS) {
  throw new Error("As variáveis de ambiente necessárias não estão definidas.");
}

if (!process.env.DATABASE_FILENAME) {
  throw new Error(
    "A variável DATABASE_FILENAME não está definida no arquivo .env"
  );
}

const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");
const DATABASE_FILENAME = process.env.DATABASE_FILENAME;

export { PORT, ALLOWED_ORIGINS, DATABASE_FILENAME };
