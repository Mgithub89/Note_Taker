
const fs = require("fs");

const { v4: uuid } = require('uuid');

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        fs.readFile('./db/db.json', "utf8", (err, data) => {
            if (err) throw err;

            res.json(JSON.parse(data))

        });
        // return res.json(data)

    });

    app.post("/api/notes", (req, res) => {

        let newdata = req.body;
        newdata.id = uuid();

        fs.readFile('./db/db.json', function (err, data) {
            if (err) throw err;
            const note = JSON.parse(data);
            note.push(newdata);
            fs.writeFile('./db/db.json', JSON.stringify(note), function (err) {
                if (err) throw err;
                console.log('new note added!');
            });
        })
        res.send(newdata);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const id = req.params.id;
        let note;
        fs.readFile('./db/db.json', function (err, data) {
            if (err) throw err;
            note = JSON.parse(data);
            note.splice(note.includes((element) => element.id === id), 1);
            fs.writeFile('./db/db.json', JSON.stringify(note), function (err) {
                if (err) throw err;
                console.log('note deleted!');
            });

        })
        res.send(note);

    })
};