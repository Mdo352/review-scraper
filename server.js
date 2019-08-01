var express = require("express");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

var PORT = process.env.PORT || 1017;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// If deployed use the mlab database, Otherwise use local
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mikejj:pencil24@ds157857.mlab.com:57857/heroku_1m01tbkl";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// routes

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});