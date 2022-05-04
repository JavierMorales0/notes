"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Notes class with all the routes for the notes
 */
const express_1 = require("express");
class Note {
    // constructor with the router configuration
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    // Method to set the routes
    routes() {
        // GET /api/notes
        this.router.get("/", (req, res) => {
            res.status(200).json({
                message: "GET /api/notes",
                data: {
                    notes: [
                        {
                            id: 1,
                            title: "Note 1",
                            content: "This is note 1",
                        },
                        {
                            id: 2,
                            title: "Note 2",
                            content: "This is note 2",
                        },
                    ],
                },
            });
        });
    }
}
exports.default = new Note().router;
