import request from "supertest";
import "dotenv/config";
import App from "../App";
import { Application } from "express";

const application = new App();
let app: Application;
beforeAll(() => {
  app = application.app;
});

describe("GET - /api/notes ", () => {
  test("sould return a status 200", async () => {
    const response = await request(app).get("/api/notes").send();
    expect(response.status).toBe(200);
  });

  test("sould return a list of notes", async () => {
    const response = await request(app).get("/api/notes").send();
    expect(response.body).toBeInstanceOf(Object);
    console.log(response.body);
  });
});

describe("POST - /api/notes ", () => {
  test("sould return a status 201", async () => {
    const response = await request(app).post("/api/notes").send({
      title: "Testing title",
      description: "Testing description",
    });
    expect(response.status).toBe(201);
  });
});
/*
describe("PUT - /api/notes/:id ", () => {
  test("sould return a status 200", async () => {
    const response = await request(app).put("/notes/1").send({
      title: "Testing title",
      description: "Testing description",
    });
    expect(response.status).toBe(200);
  });
});


describe("DELETE - /api/notes/:id ", () => {
  test("sould return a status 200", async () => {
    const response = await request(BASE_URL).delete("/notes/12").send();
    expect(response.status).toBe(200);
  });
});
*/
