$(".delete").click(function(id) {
    

    var title = $("#title").val();
    var artist = $("#artist").val();
    var album = $("#album").val();
    var albumArtist = $("#albumArtist").val();
    var year = $("#year").val();

    var jsonObject = {
        title : title,
        artist : artist,
        album : album,
        albumArtist : albumArtist,
        yearReleased : year
    };

    $.ajax({
        url : "http://localhost:5000" + "/write-data",
        type : "post",
        data : jsonObject,
        success : function(res) {
            var data = JSON.parse(res);
            if(data.msg == "SUCCESS")
                alert("Data successfully submitted!");
            else
                console.log(data.msg)
        },
        error : function(err) {
            console.log(err);
        },
    });
})