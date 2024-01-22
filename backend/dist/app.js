"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const featureFlags_1 = require("./routes/featureFlags");
const config_1 = require("./utils/config");
const app = (0, express_1.default)();
const options = {
    origin: config_1.ALLOWED_ORIGINS,
};
// app.use(cors(options));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/feature-flags", featureFlags_1.router);
exports.default = app;
