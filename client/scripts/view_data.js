// Angular Code
var app = angular.module("trackTableApp", [])

app.controller("trackTableCtrl", function($scope, $http) {
    $scope.tracks = [];
    $scope.types = [];
    
    $scope.get_records = function() {
        $http({
            method: "get",
            url: resURL + "/get-records"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.tracks = response.data.music;
                $scope.artists = getArtists(response.data.music);
                $scope.selectedArtist = $scope.artists[0];
            } else
                console.log(response.data.msg);
        }, function(response) {
            console.log(JSON.stringify(response));
        });
    }
    
    $scope.get_records();
    
    $scope.redrawTable = function() {
        var artist = $scope.selectedArtist.value;

        $http({
            method: "get",
            url: resURL + "/get-recordsByArtist",
            params: {artist: artist}
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                $scope.tracks = response.data.music;
                console.log(response.data);
            }
        }, function(response) {
            console.log(response);
        });
    }
    
    $scope.editTrack = function(trackNumber) {
        $scope.title = $scope.tracks[trackNumber].title;
        $scope.artist = $scope.tracks[trackNumber].artist;
        $scope.album = $scope.tracks[trackNumber].album;
        $scope.albumArtist = $scope.tracks[trackNumber].albumArtist;
        $scope.yearReleased = $scope.tracks[trackNumber].yearReleased;
        $scope.trackID = $scope.tracks[trackNumber]["_id"];

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.updateTrack = function() {
        if($scope.title === "" || $scope.artist === "" || $scope.album === "" || $scope.albumArtist === "" || $scope.yearReleased === "") {
            $scope.addResults = "Title, artist, & album are required!";
            return;
        }

        // temp
        console.log(JSON.stringify({
            "trackId": $scope.trackID,
            "title": $scope.title,
            "artist": $scope.artist.toLowerCase(),
            "album": $scope.album,
            "albumArtist": $scope.albumArtist,
            "yearReleased": $scope.yearReleased
        }));

        $http({
            method: "put",
            url: resURL + "/update-track",
            data: {
                "trackId": $scope.trackID,
                "title": $scope.title,
                "artist": $scope.artist.toLowerCase(),
                "album": $scope.album,
                "albumArtist": $scope.albumArtist,
                "yearReleased": $scope.yearReleased
            }
        }).then(function(response) {
            if(response.data.msg === "SUCCESS"); {
                $scope.hideTable = false;
                $scope.hideForm = true;

                $scope.get_records();

                $scope.name = "";
                $scope.type = "";
                $scope.effect = "";
                $scope.counter = "";
            }
        }, function(response) {
            console.log(response);
        });
    }
    
    $scope.cancelUpdate = function() {
        $scope.hideTable = false;
        $scope.hideForm = true;
    }

    
    $scope.deleteSpell = function(spellID) {
        $http ({
            method: "delete",
            url: potterURL + "/delete-data",
            params: {trackId : trackID}
        }).then(function(response) {
            if(response === "SUCCESS")
                $scope.redrawTable();
            else
                console.log(response.data.msg)
        }, function(response) {
            console.log(response);
        });
    }

    
    function getArtists(musicLibraryData) {
        var artistExists;
        artistsArray = [{value: "", display: "ALL"}];

        for (var i=0; i<musicLibraryData.length; ++i) {
            artistExists = artistsArray.find(function (element) {
                return element.value === musicLibraryData[i].artist;
            });

            if(artistExists)
                continue;
            else {
                artistsArray.push({value: musicLibraryData[i].artist, display: musicLibraryData[i].artist.toUpperCase()});
            }
        }
        return artistsArray;
    }
});

// JQuery Code
// main();

// function main() {
//     retrieveData();
//     console.log(data);
//     console.log(tableData);
// }

// function retrieveData() {
//     $.ajax({
//         url : "http://127.0.0.1:5000" + "/get-records",
//         type : "get",
//         success : function(res) {
//             var data = JSON.parse(res);
//             if(data.msg == "SUCCESS") {
//                 showTable(data.music);
//             }
//             else
//                 console.log(data.msg);
//         },
//         error : function(err) {
//             console.log(err);
//         }
//     })
// }

// var htmlString = "";

// function showTable(tableData) {
//     for(var i=0; i<tableData.length; i++) {
//         htmlString += "<tr>";
//             htmlString += "<td>" + tableData[i]["_id"] + "</td>";
//             htmlString += "<td>" + tableData[i].title + "</td>";
//             htmlString += "<td>" + tableData[i].artist + "</td>";
//             htmlString += "<td>" + tableData[i].album + "</td>";
//             htmlString += "<td>" + tableData[i].albumArtist + "</td>";
//             htmlString += "<td id='yearReleased'>" + tableData[i].yearReleased + "</td>";
//             htmlString += "<td class='invis'><div class='delete' id='" + tableData[i]["_id"] +"'>Delete</div></td>"
//         htmlString += "</tr>";
//     }

//     $("#musicRecords").html(htmlString);
// }