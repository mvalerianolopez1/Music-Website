main();

function main() {
    retrieveData();
    console.log(data);
    console.log(tableData);
}

function retrieveData() {
    $.ajax({
        url : "http://127.0.0.1:5000" + "/get-records",
        type : "get",
        success : function(res) {
            var data = JSON.parse(res);
            if(data.msg == "SUCCESS") {
                showTable(data.music);
            }
            else
                console.log(data.msg);
        },
        error : function(err) {
            console.log(err);
        }
    })
}

var htmlString = "";

function showTable(tableData) {
    for(var i=0; i<tableData.length; i++) {
        htmlString += "<tr>";
            htmlString += "<td>" + tableData[i]["_id"] + "</td>";
            htmlString += "<td>" + tableData[i].title + "</td>";
            htmlString += "<td>" + tableData[i].artist + "</td>";
            htmlString += "<td>" + tableData[i].album + "</td>";
            htmlString += "<td>" + tableData[i].albumArtist + "</td>";
            htmlString += "<td id='yearReleased'>" + tableData[i].yearReleased + "</td>";
            htmlString += "<td class='invis'><div class='delete' id='" + tableData[i]["_id"] +"'>Delete</div></td>"
        htmlString += "</tr>";
    }

    $("#musicRecords").html(htmlString);
}