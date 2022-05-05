import request from "supertest";
import "dotenv/config";

const BASE_URL = "http://localhost:" + (process.env.PORT || 3000) + "/api";

describe("GET - /api/notes ", () => {
  test("sould return a status 200", async () => {
    const response = await request(BASE_URL).get("/notes").send();
    expect(response.status).toBe(200);
  });

  test("sould return a list of notes", async () => {
    const response = await request(BASE_URL).get("/notes").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});
/*
describe("POST - /api/notes ", () => {
  test("sould return a status 201", async () => {
    const response = await request(BASE_URL).post("/notes").send({
      title: "Testing title",
      description: "Testing description",
    });
    expect(response.status).toBe(201);
  });
});

describe("PUT - /api/notes/:id ", () => {
  test("sould return a status 200", async () => {
    const response = await request(BASE_URL).put("/notes/1").send({
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
