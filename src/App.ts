/**
 * App file for the api
 * This is the Api Class
 */

import express from "express";
import "dotenv/config";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  // port can be number or string
  public listen(port: number | string): void {
    this.app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}

export default App;