"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./api/user.routes"));
const movie_routes_1 = __importDefault(require("./api/movie.routes"));
const routes = (0, express_1.Router)();
routes.use("/users", user_routes_1.default);
routes.use("/movies", movie_routes_1.default);
exports.default = routes;
