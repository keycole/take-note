const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    console.log("This message is inside the get '/' function");
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("This message is inside the get '/notes' function");
  });

app.get("/api/notes", function(req, res) {
    let notesJSON = fs.readFileSync("db/db.json");
    console.log(`notesJSON = ${notesJSON}`);
    res.json(JSON.parse(notesJSON));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    }); 