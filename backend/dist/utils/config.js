"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_FILENAME = exports.ALLOWED_ORIGINS = exports.PORT = void 0;
const dotenv = __importStar(require("dotenv"));
const envFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
dotenv.config({ path: envFile });
if (!process.env.PORT || !process.env.ALLOWED_ORIGINS) {
    throw new Error("As variáveis de ambiente necessárias não estão definidas.");
}
if (!process.env.DATABASE_FILENAME) {
    throw new Error("A variável DATABASE_FILENAME não está definida no arquivo .env");
}
const PORT = process.env.PORT || 3001;
exports.PORT = PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");
exports.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
const DATABASE_FILENAME = process.env.DATABASE_FILENAME;
exports.DATABASE_FILENAME = DATABASE_FILENAME;
