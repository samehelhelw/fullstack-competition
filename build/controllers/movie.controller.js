"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getOne = exports.create = void 0;
const movies_models_1 = __importDefault(require("../models/movies.models"));
const movieModel = new movies_models_1.default();
const create = async (req, res, next) => {
    try {
        const movie = await movieModel.create(req.body);
        res.json({
            status: "success",
            data: { ...movie },
            message: "Movie Created Successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getOne = async (req, res, next) => {
    try {
        const movie = await movieModel.getOne(req.params.id);
        res.json({
            status: "success",
            data: movie,
            message: "Movie retrieved successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const updateOne = async (req, res, next) => {
    try {
        const movie = await movieModel.updateOne(req.body);
        res.json({
            status: "success",
            data: movie,
            message: "Movie updated successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateOne = updateOne;
const deleteOne = async (req, res, next) => {
    try {
        const movie = await movieModel.deleteOne(req.params.id);
        res.json({
            status: "success",
            data: movie,
            message: "Movie deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOne = deleteOne;
