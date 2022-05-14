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
const index_1 = __importDefault(require("../db/index"));
const express_validator_1 = require("express-validator");
class NoteService {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sql = "SELECT * FROM note WHERE id = $1";
                const response = yield index_1.default.query(sql, [id]);
                return res.status(200).json(response.rows);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // VALIDATE IF THERE IS AN ERROR IN PARAMS
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            try {
                const { title, content, is_important, is_private, pass } = req.body;
                const sql = "INSERT INTO note (title, content, is_important, is_private, pass) VALUES ($1, $2, $3, $4, $5) RETURNING title";
                const response = yield index_1.default.query(sql, [
                    title,
                    content,
                    is_important,
                    is_private,
                    pass,
                ]);
                return res.status(201).json(response.rows[0]);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // VALIDATE IF THERE IS AN ERROR IN PARAMS
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            try {
                const { id } = req.params;
                const { title, content, is_important, is_private, pass } = req.body;
                const sql = "UPDATE note SET title = $1, content = $2, is_important = $3, is_private = $4, pass = $5 WHERE id = $6 RETURNING *";
                const response = yield index_1.default.query(sql, [
                    title,
                    content,
                    is_important,
                    is_private,
                    pass,
                    id,
                ]);
                return res.status(200).json(response.rows[0]);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const sql = "DELETE FROM note WHERE id = $1 RETURNING *";
                const response = yield index_1.default.query(sql, [id]);
                return res.status(200).json({
                    message: "Note deleted",
                    note: response.rows[0],
                });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.default = new NoteService();
