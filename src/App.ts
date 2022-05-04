/**
 * App file for the api
 * This is the Api Class
 */

import express from "express";
import "dotenv/config";
// Import the routes
import Note from "./routes/NoteRoute";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use("/api/notes", Note);
  }

  // port can be number or string
  public listen(port: number | string): void {
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}

export default App;
