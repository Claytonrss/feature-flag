import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT || !process.env.ALLOWED_ORIGINS) {
  throw new Error("As variáveis de ambiente necessárias não estão definidas.");
}

if (!process.env.DATABASE_FILENAME) {
  throw new Error(
    "A variável DATABASE_FILENAME não está definida no arquivo .env"
  );
}

const PORT = process.env.PORT || 3001;
console.log("🚀 ~ PORT:", PORT)
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");
console.log("🚀 ~ ALLOWED_ORIGINS:", ALLOWED_ORIGINS)
const DATABASE_FILENAME = process.env.DATABASE_FILENAME;
console.log("🚀 ~ DATABASE_FILENAME:", DATABASE_FILENAME)

export { PORT, ALLOWED_ORIGINS, DATABASE_FILENAME };
