var data = '[{"title" : "The Hope", "artist" : "Nonetrown", "album" : "Finding Feelings, Vol. 2", "albumArtist" : "Nonetrown", "yearReleased" : "2023"}, {"title" : "Kids", "artist" : "Nonetrown", "album" : "Finding Feelings, Vol. 2", "albumArtist" : "Nonetrown", "yearReleased" : "2023"}, {"title" : "6_6_12", "artist" : "Bartlebeats", "album" : "Frequency", "albumArtist" : "Bartlebeats", "yearReleased" : "2014"}, {"title" : "Heavy Tech", "artist" : "Anders Baldwin", "album" : "Heavy Tech", "albumArtist" : "Anders Baldwin", "yearReleased" : "2015"}, {"title" : "The Complete Funeral Music For Queen Mary: X. Thou Knowest, Lord, the Secrets of Our Hearts", "artist" : "Harry Christophers & The Sixteen", "album" : "Purcell: Love\'s Goddess Sure Was Blind - Funeral Music for Queen Mary - Latin Motets", "albumArtist" : "N/A", "yearReleased" : "2004"}]';
var jsonObject = JSON.parse(data);

main();

function main() {
    console.log(data);
    console.log(jsonObject);

    showTable();
}

var htmlString = "";

function showTable() {
    for(var i=0; i<jsonObject.length; i++) {
        htmlString += "<tr>";
            htmlString += "<td>" + jsonObject[i].title + "</td>";
            htmlString += "<td>" + jsonObject[i].artist + "</td>";
            htmlString += "<td>" + jsonObject[i].album + "</td>";
            htmlString += "<td>" + jsonObject[i].albumArtist + "</td>";
            htmlString += "<td id='yearReleased'>" + jsonObject[i].yearReleased + "</td>";
        htmlString += "</tr>";
    }

    $("#musicRecords").html(htmlString);
}