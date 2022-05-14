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
const index_1 = __importDefault(require("../../db/index"));
const express_validator_1 = require("express-validator");
class NoteController {
    // constructor with the router configuration
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    // Method to set the routes
    routes() {
        // GET /api/notes
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM note";
                const response = yield index_1.default.query(sql);
                return res.status(200).json({
                    notes: response.rows,
                });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
        // GET /api/notes/:id
        this.router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sql = "SELECT * FROM note WHERE id = $1";
                const response = yield index_1.default.query(sql, [id]);
                return res.status(200).json(response.rows);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
        // POST /api/notes
        this.router.post("/", (0, express_validator_1.body)("title").not().isEmpty().withMessage("Title is required"), (0, express_validator_1.body)("content").not().isEmpty().withMessage("Content is required"), (0, express_validator_1.body)("is_important").isBoolean().withMessage("Is important is required"), (0, express_validator_1.body)("is_private").isBoolean().withMessage("Is private is required"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            try {
                const { title, content, is_important, is_private, pass } = req.body;
                const sql = "INSERT INTO note (title, content, is_important, is_private, pass) VALUES ($1, $2, $3, $4, $5)";
                const response = yield index_1.default.query(sql, [
                    title,
                    content,
                    is_important,
                    is_private,
                    pass,
                ]);
                return res.status(201).json(response.rows);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
        // PUT /api/notes/:id
        // DELETE /api/notes/:id
        this.router.delete("/:id", (0, express_validator_1.param)("id").isNumeric().withMessage("Id must be a number"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sql = "DELETE FROM note WHERE id = $1";
                yield index_1.default.query(sql, [id]);
                return res.status(200).json("Note deleted");
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
    }
}
exports.default = new NoteController().router;
