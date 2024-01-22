"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
const server = app_1.default.listen(config_1.PORT, () => {
    console.log(`Servidor rodando na porta ${config_1.PORT}`);
});
process.on("SIGINT", () => {
    console.log("Encerrando o servidor...");
    server.close(() => {
        console.log("Servidor encerrado.");
        process.exit(0);
    });
});
