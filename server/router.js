const path = require("path");

// Page listeners
var router = function(app) {
    app.get("/", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/music_home.html"));
    })

    
    app.get("/home", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/music_home.html"));
    })

    app.get("/write-data", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/write_data.html"));
    })

    app.get("/view-data", function(req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/view_data.html"));
    })
}

module.exports = router;