import { Request, Response } from "express";
import conn from "../db/index";
import { validationResult } from "express-validator";

class NoteService {
  public async getAll(req: Request, res: Response) {
    try {
      const sql = "SELECT * FROM note";
      const response = await conn.query(sql);
      return res.status(200).json({
        notes: response.rows,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sql = "SELECT * FROM note WHERE id = $1";
      const response = await conn.query(sql, [id]);
      return res.status(200).json(response.rows);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  public async create(req: Request, res: Response) {
    // VALIDATE IF THERE IS AN ERROR IN PARAMS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { title, content, is_important, is_private, pass } = req.body;
      const sql =
        "INSERT INTO note (title, content, is_important, is_private, pass) VALUES ($1, $2, $3, $4, $5) RETURNING title";
      const response = await conn.query(sql, [
        title,
        content,
        is_important,
        is_private,
        pass,
      ]);
      return res.status(201).json(response.rows[0]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  public async update(req: Request, res: Response) {
    // VALIDATE IF THERE IS AN ERROR IN PARAMS
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { title, content, is_important, is_private, pass } = req.body;
      const sql =
        "UPDATE note SET title = $1, content = $2, is_important = $3, is_private = $4, pass = $5 WHERE id = $6 RETURNING *";
      const response = await conn.query(sql, [
        title,
        content,
        is_important,
        is_private,
        pass,
        id,
      ]);
      return res.status(200).json(response.rows[0]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sql = "DELETE FROM note WHERE id = $1 RETURNING *";
      const response = await conn.query(sql, [id]);
      return res.status(200).json({
        message: "Note deleted",
        note: response.rows[0],
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new NoteService();
