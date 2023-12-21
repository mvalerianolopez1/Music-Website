const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const fs = require("fs");
const path = require("path");

const databaseFile = path.join(__dirname + "/../server/files/data.txt");

//Define Database URL
var dbURL = "mongodb://0.0.0.0:27017";

var services = function(app) {
    app.post("/write-data", function(req, res) {

        var newTrack = {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            albumArtist: req.body.albumArtist,
            yearReleased: req.body.yearReleased
        };
        
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err)
                return res.status(201).send(JSON.stringify({msg: err}));
            else {
                var dbo = client.db("musiclibrary");

                dbo.collection("music").insertOne(newTrack, function(err) {
                    if(err)
                        return res.status(201).send(JSON.stringify({msg: err}));
                    else {
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }
                });
            }
        })

    // File-DB Code
    //     var musicData = {
    //         id : id,
    //         title : req.body.title,
    //         artist : req.body.artist,
    //         album : req.body.album,
    //         albumArtist : req.body.albumArtist,
    //         yearReleased : req.body.yearReleased
    //     }

    //     var musicLibraryData = [];

    //     if(fs.existsSync(databaseFile)) {
    //         fs.readFile(databaseFile, "utf8", function(err, data) {
    //             if (err)
    //                 res.send(JSON.stringify({msg: err}));
    //             else {
    //                 musicLibraryData = JSON.parse(data);
    //                 musicLibraryData.push(musicData);

    //                 fs.writeFile(databaseFile, JSON.stringify(musicLibraryData), function(err) {
    //                     if (err)
    //                         res.send(JSON.stringify({msg: err}));
    //                     else
    //                         res.send(JSON.stringify({msg: "SUCCESS"}));
    //                 })
    //             }
    //         })
    //     } else {
    //         musicLibraryData.push(musicData);

    //         fs.writeFile(databaseFile, JSON.stringify(musicLibraryData), function(err) {
    //             if(err)
    //                 res.send(JSON.stringify({msg : err}));
    //             else
    //                 res.send(JSON.stringify({msg : "SUCCESS"}));
    //         })
    //     }
    });

    app.get("/get-records", function(req, res) {

        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err)
                return res.status(201).send(JSON.stringify({msg: err}));
            else {
                var dbo = client.db("musiclibrary");

                dbo.collection("music").find().toArray(function(err, data) {
                    if(err)
                        return res.status(201).send(JSON.stringify({msg: err}));
                    else {
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS", music: data}));
                    }
                });
            }
        })

        // File-DB Code
        // if(fs.existsSync(databaseFile)) {
        //     fs.readFile(databaseFile, "utf8", function(err, data) {
        //         if(err)
        //             res.send(JSON.stringify({msg: err}));
        //         else {
        //             musicLibraryData = JSON.parse(data);
        //             res.send(JSON.stringify({msg:"SUCCESS", musicLibraryData : musicLibraryData}));
        //         }
        //     });
        // } else {
        //     var data = [];
        //     res.send(JSON.stringify({msg:"SUCCESS", musicLibraryData : data}));
        // }
    });


    
    app.post("/delete-data", function(req, res) {
        var trackID = req.body.id;
        var m_id = new ObjectID(trackID);
        var search = {_id: m_id}
        MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
            if(err)
                return res.status(201).send(JSON.stringify({msg: err}));
            else {
                var dbo = client.db("musiclibrary");
                
                console.log(req.body.id);

                dbo.collection("music").deleteOne(search, function(err) {
                    if(err)
                        return res.status(201).send(JSON.stringify({msg: err}));
                    else {
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                    }
                });
            }
        })

    // File-DB Code
        // var musicData = {
        //     id : req.body.id
        // }

        // if(fs.existsSync(databaseFile)) {
        //     fs.readFile(databaseFile, "utf8", function(err, data) {
        //         if (err)
        //             res.send(JSON.stringify({msg: err}));
        //         else {
        //             console.log(musicData.id);
        //             var idToDelete = musicData.id;
        //             var filteredArray = musicLibraryData.filter((obj) => obj.id !== idToDelete);

        //             // Object.keys(musicLibraryData).forEach(key => musicLibraryData[key] === undefined ? delete musicLibraryData[key] : {});

        //             fs.writeFile(databaseFile, JSON.stringify(filteredArray), function(err) {
        //                 if (err)
        //                     res.send(JSON.stringify({msg: err}));
        //                 else
        //                     res.send(JSON.stringify({msg: "SUCCESS"}));
        //             })
        //         }
        //     })
        // } else {
        //     musicLibraryData.push(musicData);

        //     fs.writeFile(databaseFile, JSON.stringify(musicLibraryData), function(err) {
        //         if(err)
        //             res.send(JSON.stringify({msg : err}));
        //         else
        //             res.send(JSON.stringify({msg : "SUCCESS"}));
        //     })
        // }
    })
};

//To Initialize table
var initializeDatabase = function() {
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client) {
        if(err) {
            console.log(err);
        } else {
            var dbo = client.db("musiclibrary");
    
            //See if the database has any records
            dbo.collection("music").find().toArray(function(err, data) {
                if(err) {
                    client.close();
                    console.log(err);
                } else {
                    if(data.length === 0) {
                        var music = [{"title":"The Hope","artist":"Nonetrown","album":"Finding Feelings, Vol. 2","albumArtist":"Nonetrown","yearReleased":"2023"},{"title":"PILLOWTALK","artist":"ZAYN","album":"Mind of Mine","albumArtist":"ZAYN","yearReleased":"2016"},{"title":"Microscience","artist":"Andy Clark","album":"Innovation Communication (Original Soundtrack)","albumArtist":"Various Artists","yearReleased":"2013"},{"title":"Symphony for a Spider Plant","artist":"Mort Garson","album":"Mother Earth's Plantasia","albumArtist":"Mort Garson","yearReleased":"1976"}];
    
                        dbo.collection("music").insertMany(music, function(err) {
                            if(err) {
                                client.close();
                                console.log(err);
                            } else {
                                console.log("Added seed records");
                                client.close();
                            }
    
                        });
                    } else {
                        console.log("Seed record alreay exist");
                        client.close();
                    }
    
                }
            });
        }
    });
    
}

module.exports = { services, initializeDatabase };