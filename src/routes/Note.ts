/**
 * Notes class with all the routes for the notes
 */
import { Router } from "express";

class Note {
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

export default new Note().router;
