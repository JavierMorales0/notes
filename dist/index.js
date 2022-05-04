"use strict";
/**
 * Index file for the api
 * This API is going to be used by the frontend to interact with the backend
 * to get the personal notes and the notes of the user's friends
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
// Create a new instance of the app
const app = new App_1.default();
// Listen on port env.PORT or 3000
app.listen(process.env.PORT || 3000);
