// DEPENDENCIES
var express = require("express");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this  in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing api and html routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

//start the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
});