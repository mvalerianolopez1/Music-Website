const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname + "./files/data.txt");

var services = function(app) {
    app.post("/write-data", function(req, res) {
        var id = "lib" + Date.now();

        var musicData = {
            id: id,
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            albumArtist: req.body.albumArtist,
            yearReleased: req.body.yearReleased
        }

        var musicLibraryData = [];

        if(fs.existsSync(databaseFile)) {
            fs.readFile(databaseFile, "utf8", function(err, data) {
                if (err)
                    res.send(JSON.stringify({msg: err}));
                else {
                    musicLibraryData = JSON.parse(data);
                    musicLibraryData.push(musicData);

                    fs.writeFile(databaseFile, JSON.stringify(musicLibraryData), function(err) {
                        if (err)
                            res.send(JSON.stringify({msg: err}));
                        else
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                    })
                }
            })
        }
    })
};

module.exports = services;