// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require("path");
var fs = require("fs");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());



// ================================================================================
// ROUTES
// ================================================================================
//HTML
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function(req, res){
    let notesJSON = fs.readFileSync("db/db.json");
    console.log(`notesJSON = ${notesJSON}`);
    res.json(JSON.parse(notesJSON));
});

app.post("/api/notes", function(req, res){
    let noteToSave = req.body;
    currentNotes = fs.readFileSync("db/db.json");
    let updatedNotesArray = JSON.parse(currentNotes);
    updatedNotesArray.push(noteToSave);
    fs.writeFileSync("db/db.json", JSON.stringify(updatedNotesArray));
    res.send(console.log("Success!"));
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});