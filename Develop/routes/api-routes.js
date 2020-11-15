const data = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        fs.readFile('./db/db.json', "utf8", (err, data) => {
            if (err) throw err;
            // console.log(data);
            res.json(JSON.parse(data))

        });
        // return res.json(data)

    });

    app.post("/api/notes", (req, res) => {

        let newdata = req.body;
        fs.readFile('./db/db.json', function (err, data) {
            if (err) throw err;
            const json = JSON.parse(data);
            json.push(newdata);
            fs.writeFile('./db/db.json', JSON.stringify(json), function (err) {
                if (err) throw err;
                console.log('new note added!');
            });
        })
        res.send(newdata);
    });
};