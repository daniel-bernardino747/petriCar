"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
require("express-async-errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)()).use(express_1.default.json()).use(index_1.default);
const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`🌀 started server in door: ${port}`);
});
