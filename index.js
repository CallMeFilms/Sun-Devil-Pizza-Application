// Imports
const express = require("express");     // Used to serve website content to user over HTTP

// Create web app
const app = express();

// GET Requests

// "/" - Home page endpoint
app.get("/", (req, res) => {
    res.send("Hello world");
});

// Begin listening on 3000
app.listen(3000, () => {
    console.log("Listening on port 3000");
});