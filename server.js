// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var jquery = require("jquery");
const { Console } = require("console");

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
      return res.json(JSON.parse(notesJSON));
    } else {
      return res.send("There are no stored notes yet.");
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

  app.delete("/api/notes/:id", function(req, res){
    let selectedID = req.params.id;
      console.log(`The selectedID = ${selectedID}`);
    let notesArray = JSON.parse(fs.readFileSync("db/db.json")) ||[];
      console.log(`notesArray = ${JSON.stringify(notesArray)}`);
    for(let i = 0; i < notesArray.length; i++){
      console.log("We made it inside the for loop");
      if(parseInt(notesArray[i].id) == selectedID){
        console.log(`The index is ${i}, the selectedID = ${selectedID}, and the notesArray[i].id = ${notesArray[i].id}`);
        console.log
        notesArray.splice(i, 1);
        fs.writeFileSync("db/db.json", JSON.stringify(notesArray));
        return console.log(`The notesArray after splice = ${JSON.stringify(notesArray)}`);
      }else{
        console.log(`The index is ${i}, and we do not have a match`);
        console.log(`The selectedID = ${selectedID} and he notesArray[i].id = ${notesArray[i].id}`);
      }
    }
    return res.send(console.log("The db.json file should have been updated!"));
  });

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});