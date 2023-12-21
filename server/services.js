const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname + "/../server/files/data.txt");

var services = function(app) {
    app.post("/write-data", function(req, res) {
        var id = "lib" + Date.now();

        var musicData = {
            id : id,
            title : req.body.title,
            artist : req.body.artist,
            album : req.body.album,
            albumArtist : req.body.albumArtist,
            yearReleased : req.body.yearReleased
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
        } else {
            musicLibraryData.push(musicData);

            fs.writeFile(databaseFile, JSON.stringify(musicLibraryData), function(err) {
                if(err)
                    res.send(JSON.stringify({msg : err}));
                else
                    res.send(JSON.stringify({msg : "SUCCESS"}));
            })
        }
    });

    app.get("/get-records", function(req, res) {
        if(fs.existsSync(databaseFile)) {
            fs.readFile(databaseFile, "utf8", function(err, data) {
                if(err)
                    res.send(JSON.stringify({msg: err}));
                else {
                    musicLibraryData = JSON.parse(data);
                    res.send(JSON.stringify({msg:"SUCCESS", musicLibraryData : musicLibraryData}));
                }
            });
        } else {
            var data = [];
            res.send(JSON.stringify({msg:"SUCCESS", musicLibraryData : data}));
        }
    });

    app.post("/delete-data", function(req, res) {
        var musicData = {
            id : req.body.id
        }

        if(fs.existsSync(databaseFile)) {
            fs.readFile(databaseFile, "utf8", function(err, data) {
                if (err)
                    res.send(JSON.stringify({msg: err}));
                else {
                    console.log(musicData.id);
                    var idToDelete = musicData.id;
                    var filteredArray = musicLibraryData.filter((obj) => obj.id !== idToDelete);

                    // Object.keys(musicLibraryData).forEach(key => musicLibraryData[key] === undefined ? delete musicLibraryData[key] : {});

                    fs.writeFile(databaseFile, JSON.stringify(filteredArray), function(err) {
                        if (err)
                            res.send(JSON.stringify({msg: err}));
                        else
                            res.send(JSON.stringify({msg: "SUCCESS"}));
                    })
                }
            })
        } else {
            musicLibraryData.push(musicData);

            fs.writeFile(databaseFile, JSON.stringify(musicLibraryData), function(err) {
                if(err)
                    res.send(JSON.stringify({msg : err}));
                else
                    res.send(JSON.stringify({msg : "SUCCESS"}));
            })
        }
    })
};

module.exports = services;