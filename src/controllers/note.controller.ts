/**
 * Notes class with all the routes for the notes
 */
import { Router } from "express";
import Note from "../models/Note";
import conn from "../db/index";

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
    this.router.get("/", async (req, res) => {
      try {
        const sql = "SELECT * FROM notes";
        const response = await conn.query(sql);
        return res.status(200).json({
          notes: response.rows,
        });
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // GET /api/notes/:id
    this.router.get("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const sql = "SELECT * FROM notes WHERE id = $1";
        const response = await conn.query(sql, [id]);
        return res.status(200).json(response.rows);
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // POST /api/notes
    this.router.post("/", async (req, res) => {
      try {
        const { title, description } = req.body;
        if (!title || !description) {
          return res.status(400).json({
            error: "Title and description are required",
          });
        }
        const note = new Note(title, description);
        const sql = "INSERT INTO notes (title, description) VALUES ($1, $2)";
        await conn.query(sql, [note.title, note.description]);
        return res.status(201).json("Note created");
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // PUT /api/notes/:id
    this.router.put("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { title, description } = req.body;
        const note = new Note(title, description);
        const sql =
          "UPDATE notes SET title = $1, description = $2 WHERE id = $3";
        await conn.query(sql, [note.title, note.description, id]);
        return res.status(200).json("Note updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    // DELETE /api/notes/:id
    this.router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const sql = "DELETE FROM notes WHERE id = $1";
        await conn.query(sql, [id]);
        return res.status(200).json("Note deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    });
  }
}

export default new NoteController().router;
