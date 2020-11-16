// DEPENDENCIES
const fs = require("fs");
//v4: uuid to generate unique id(npm i uuid)
const { v4: uuid } = require('uuid');

//Exporting function to use in server.js
module.exports = function (app) {

    //get rquest. TO display all saved notes
    app.get("/api/notes", (req, res) => {
        fs.readFile('./db/db.json', "utf8", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data))
        });

    });

    //post request. unique id wiil created and save new note in db.json using push()method.
    app.post("/api/notes", (req, res) => {
        let newNote = req.body;
        newNote.id = uuid();

        fs.readFile('./db/db.json', function (err, data) {
            if (err) throw err;
            const note = JSON.parse(data);
            note.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(note), function (err) {
                if (err) throw err;
                console.log('new note added!');
            });
        })
        res.send(newNote);
    });

    //delete request . if requested id matches with the id in db.json array.
    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        let note;
        fs.readFile('./db/db.json', function (err, data) {
            if (err) throw err;
            note = JSON.parse(data);
            note.splice(note.includes((element) => element.id === id), 1);
            fs.writeFile('./db/db.json', JSON.stringify(note), function (err) {
                if (err) throw err;
                console.log('note succesfully deleted!');
            });

        })
        res.send(note);

    })
};