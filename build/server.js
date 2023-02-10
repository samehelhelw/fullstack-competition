"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = config_1.default.port || 3000;
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.listen(PORT, () => console.log(`app listening on port http://localhost:${PORT} !`));
app.use((req, res) => {
    res.status(404).send("Not found");
});
exports.default = app;
