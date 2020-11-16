// DEPENDENCIES
// path package to get the correct file path for our html
const path = require("path");

//Exporting function to use in server.js
module.exports = function (app) {

    //route to notes page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // If no matching route is found default to homepage(index.html)
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};