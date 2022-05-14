/**
 * Notes class with all the routes for the notes
 */
import { Router, Request, Response } from "express";
import Note from "../models/Note";
import conn from "../db/index";
import { body, param, validationResult } from "express-validator";

class NoteController {
  // Setting the router
  public router: Router;

  // constructor with the router configuration
  constructor() {
    this.router = Router();
    this.routes();
  }
  // Method to set the routes
  public routes() {
    // GET /api/notes
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const sql = "SELECT * FROM note";
        const response = await conn.query(sql);
        return res.status(200).json({
          notes: response.rows,
        });
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // GET /api/notes/:id
    this.router.get("/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const sql = "SELECT * FROM note WHERE id = $1";
        const response = await conn.query(sql, [id]);
        return res.status(200).json(response.rows);
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // POST /api/notes
    this.router.post(
      "/",
      body("title").not().isEmpty().withMessage("Title is required"),
      body("content").not().isEmpty().withMessage("Content is required"),
      body("is_important").isBoolean().withMessage("Is important is required"),
      body("is_private").isBoolean().withMessage("Is private is required"),
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        try {
          const { title, content, is_important, is_private, pass } = req.body;
          const sql =
            "INSERT INTO note (title, content, is_important, is_private, pass) VALUES ($1, $2, $3, $4, $5)";
          const response = await conn.query(sql, [
            title,
            content,
            is_important,
            is_private,
            pass,
          ]);
          return res.status(201).json(response.rows);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    );

    // PUT /api/notes/:id
   

    // DELETE /api/notes/:id
    this.router.delete(
      "/:id",
      param("id").isNumeric().withMessage("Id must be a number"),
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const sql = "DELETE FROM note WHERE id = $1";
          await conn.query(sql, [id]);
          return res.status(200).json("Note deleted");
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    );
  }
}

export default new NoteController().router;
