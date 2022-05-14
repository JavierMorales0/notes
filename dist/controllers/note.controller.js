"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Notes class with all the routes for the notes
 */
const express_1 = require("express");
const note_service_1 = __importDefault(require("./note.service"));
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
        this.router.get("/", note_service_1.default.getAll);
        // GET /api/notes/:id
        this.router.get("/:id", note_service_1.default.getOne);
        // POST /api/notes
        this.router.post("/", (0, express_validator_1.body)("title").not().isEmpty().withMessage("Title is required"), (0, express_validator_1.body)("content").not().isEmpty().withMessage("Content is required"), (0, express_validator_1.body)("is_important").isBoolean().withMessage("Is important is required"), (0, express_validator_1.body)("is_private").isBoolean().withMessage("Is private is required"), note_service_1.default.create);
        // PUT /api/notes/:id
        this.router.put("/:id", (0, express_validator_1.body)("title").not().isEmpty().withMessage("Title is required"), (0, express_validator_1.body)("content").not().isEmpty().withMessage("Content is required"), (0, express_validator_1.body)("is_important").isBoolean().withMessage("Is important is required"), (0, express_validator_1.body)("is_private").isBoolean().withMessage("Is private is required"), note_service_1.default.update);
        // DELETE /api/notes/:id
        this.router.delete("/:id", note_service_1.default.delete);
    }
}
exports.default = new NoteController().router;
