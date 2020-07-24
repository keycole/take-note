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

//API
app.get("/api/notes", function(req, res){
    let notesJSON = fs.readFileSync("db/db.json") ||[];
    if(notesJSON){
      res.json(JSON.parse(notesJSON));
    }
});

app.post("/api/notes", function(req, res){
    let retrieveID = JSON.parse(fs.readFileSync("db/id.json")) || 0;
    let updatedNotesArray = JSON.parse(fs.readFileSync("db/db.json")) || [];
    let note = req.body;
    note.id = retrieveID.masterID + 1;
    masterID = {"masterID": note.id};
    updatedNotesArray.push(note);
    fs.writeFileSync("db/db.json", JSON.stringify(updatedNotesArray));
    fs.writeFileSync("db/id.json", JSON.stringify(masterID));
    
    res.send(console.log("Success! Your new note has been saved to the db.json file and the master id has been updated."));
});

  app.delete("/api/notes/:id", function(req, res){
    let selectedID = req.params.id;
    let notesArray = JSON.parse(fs.readFileSync("db/db.json")) ||[];
    for(let i = 0; i < notesArray.length; i++){
      if(parseInt(notesArray[i].id) == selectedID){
        notesArray.splice(i, 1);
        fs.writeFileSync("db/db.json", JSON.stringify(notesArray));
      }
    }
    res.send(console.log("Successful deletion! The db.json file has been updated."));
  });

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});