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
const Note_1 = __importDefault(require("../models/Note"));
const index_1 = __importDefault(require("../db/index"));
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
                const sql = "SELECT * FROM notes";
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
                const sql = "SELECT * FROM notes WHERE id = $1";
                const response = yield index_1.default.query(sql, [id]);
                return res.status(200).json(response.rows);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
        // POST /api/notes
        this.router.post("/", (0, express_validator_1.body)("title").not().isEmpty().withMessage("Title is required"), (0, express_validator_1.body)("description")
            .not()
            .isEmpty()
            .withMessage("Description is required"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            try {
                const { title, description } = req.body;
                const note = new Note_1.default(title, description);
                const sql = "INSERT INTO notes (title, description) VALUES ($1, $2)";
                yield index_1.default.query(sql, [note.title, note.description]);
                return res.status(201).json("Note created");
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
        // PUT /api/notes/:id
        this.router.put("/:id", (0, express_validator_1.param)("id").isNumeric().withMessage("Id must be a number"), (0, express_validator_1.body)("title").not().isEmpty().withMessage("Title is required"), (0, express_validator_1.body)("description")
            .not()
            .isEmpty()
            .withMessage("Description is required"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description } = req.body;
                const note = new Note_1.default(title, description);
                const sql = "UPDATE notes SET title = $1, description = $2 WHERE id = $3";
                yield index_1.default.query(sql, [note.title, note.description, id]);
                return res.status(200).json("Note updated");
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }));
        // DELETE /api/notes/:id
        this.router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sql = "DELETE FROM notes WHERE id = $1";
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
