"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
require("dotenv/config");
const App_1 = __importDefault(require("../App"));
const application = new App_1.default();
let app;
beforeAll(() => {
    app = application.app;
});
describe("GET - /api/notes ", () => {
    test("sould return a status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/api/notes").send();
        expect(response.status).toBe(200);
    }));
    test("sould return a list of notes", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/api/notes").send();
        expect(response.body).toBeInstanceOf(Object);
        console.log(response.body);
    }));
});
describe("POST - /api/notes ", () => {
    test("sould return a status 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/notes").send({
            title: "Testing title",
            description: "Testing description",
        });
        expect(response.status).toBe(201);
    }));
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
