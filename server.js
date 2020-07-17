const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    console.log("This message is inside the get '/' function");
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("This message is inside the get '/notes' function");
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    }); 