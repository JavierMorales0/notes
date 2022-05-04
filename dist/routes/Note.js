"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Notes class with all the routes for the notes
 */
const express_1 = require("express");
const index_1 = __importDefault(require("../db/index"));
const Note_1 = __importDefault(require("../models/Note"));
class NoteRoute {
    // constructor with the router configuration
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    // Method to set the routes
    routes() {
        // GET /api/notes
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM notes";
            const response = yield index_1.default.query(sql);
            console.log(response);
            return res.status(200).json("Notes");
        }));
    }
}
exports.default = new Note_1.default().router;
