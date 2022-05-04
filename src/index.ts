/**
 * Index file for the api
 * This API is going to be used by the frontend to interact with the backend
 * to get the personal notes and the notes of the user's friends
 */

import App from "./App";

// Create a new instance of the app
const app = new App();
// Listen on port env.PORT or 3000
app.listen(process.env.PORT || 3000);
