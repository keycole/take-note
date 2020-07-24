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

// Master ID for notes
let masterID = 0;

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
    console.log(`notesJSON = ${notesJSON}`);
    if(notesJSON){
      res.json(JSON.parse(notesJSON));
    } else {
      res.send("There are no stored notes yet.");
    }
    
});

app.post("/api/notes", function(req, res){
    let retrieveID = JSON.parse(fs.readFileSync("db/id.json")) || 0;
    console.log(`The retrieved ID = ${retrieveID}`);
    let updatedNotesArray = JSON.parse(fs.readFileSync("db/db.json")) || [];
    let note = req.body;
    console.log(`RetrieveID = ${retrieveID.masterID}`)
    note.id = retrieveID.masterID + 1;
    console.log(`note.id = ${note.id}`);
    masterID = {"masterID": note.id};
    console.log(`The masterID = ${masterID}`);
    updatedNotesArray.push(note);
    fs.writeFileSync("db/db.json", JSON.stringify(updatedNotesArray));
    fs.writeFileSync("db/id.json", JSON.stringify(masterID));

    return res.send(console.log("Success!"));
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});