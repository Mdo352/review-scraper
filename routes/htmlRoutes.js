var path = require("path");

module.exports = function(app) {
    
    app.get("/saved", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/savedArticles.html"));
    });
    
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};