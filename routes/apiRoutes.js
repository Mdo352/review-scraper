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

                // Save these results in an object that we'll push into the results array we defined earlier
                result.product = $(this).find("a").text();
                result.link = "https://cnet.com"+$(this).find("a").attr("href");

                db.Review.create(result)
                .then(function(dbReview) {
                    // View the added result in the console
                    console.log(dbReview);
                    res.redirect('/');
                })
                .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });

                // res.send("Scrape Complete");
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

    // Route for updating saved to true
    app.put("/reviews/:id", function(req, res) {
        // console.log(req.params.id)
        db.Review.findByIdAndUpdate(req.params.id, { $set: {saved: true} })
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for saving/updating a products associated Note
    // app.get("/reviews/:id", function(req, res) {

    //     console.log(req.params.id);
        // Create a new note and pass the req.body to the entry
        // db.Review.findByIdAndUpdate(req.params.id, {new: true})
        // .then(function(dbReview) {
        //     // If we were able to successfully update an Article, send it back to the client
        //     res.json(dbReview);
        // })
        // .catch(function(err) {
        //     // If an error occurred, send it to the client
        //     res.json(err);
        // });
    // });
};