"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const start = async () => {
    await (0, db_1.connectDB)();
    app_1.default.listen(env_1.PORT, () => {
        console.log(`Server running on port ${env_1.PORT}`);
    });
};
start();
//# sourceMappingURL=index.js.map