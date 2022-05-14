/**
 * Notes class with all the routes for the notes
 */
import { Router } from "express";
import noteService from "./note.service";
import { body } from "express-validator";

class NoteController {
  // Setting the router +
  public router: Router;

  // constructor with the router configuration
  constructor() {
    this.router = Router();
    this.routes();
  }
  // Method to set the routes
  public routes() {
    // GET /api/notes
    this.router.get("/", noteService.getAll);

    // GET /api/notes/:id
    this.router.get("/:id", noteService.getOne);

    // POST /api/notes
    this.router.post(
      "/",
      body("title").not().isEmpty().withMessage("Title is required"),
      body("content").not().isEmpty().withMessage("Content is required"),
      body("is_important").isBoolean().withMessage("Is important is required"),
      body("is_private").isBoolean().withMessage("Is private is required"),
      noteService.create
    );

    // PUT /api/notes/:id
    this.router.put(
      "/:id",
      body("title").not().isEmpty().withMessage("Title is required"),
      body("content").not().isEmpty().withMessage("Content is required"),
      body("is_important").isBoolean().withMessage("Is important is required"),
      body("is_private").isBoolean().withMessage("Is private is required"),
      noteService.update
    );

    // DELETE /api/notes/:id
    this.router.delete("/:id", noteService.delete);
  }
}

export default new NoteController().router;
