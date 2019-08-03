var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");

module.exports = function (app) {

    // A GET route for scraping the echoJS website
    app.get("/scrape", function(req, res) {

        axios.get("https://www.cnet.com/editors-choice/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            
            // Save an empty result object
            var result = {};

            $(".productName").each(function(i, element) {
        
                var product = $(element).find("a").text();
                var link = $(element).find("a").attr("href");

                // Save these results in an object that we'll push into the results array we defined earlier
                result.product = $(this).find("a").text();
                result.link = "https://cnet.com"+$(this).find("a").attr("href");

                db.Review.create(result)
                .then(function(dbReview) {
                    // View the added result in the console
                    console.log(dbReview);
                })
                .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });

                res.send("Scrape Complete");
            });
        });
    });

    // Route for getting all Reviews from the db
    app.get("/reviews", function(req, res) {
        db.Review.find({})
        .then(function(dbReview) {
            res.json(dbReview);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/reviews/:id", function(req, res) {
        db.Review.findOne({ _id: req.params.id })
        // db.Review.findByID(req.params.id)
        .populate("note")
        .then(function(dbReview) {
            res.json(dbReview);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function(req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Review.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbReview) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbReview);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });
};