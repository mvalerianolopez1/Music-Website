var app = angular.module("browseDataApp", []);
var musicLibraryData = [];
var activeTrack = 0;

app.controller("browseDataCtrl", function($scope, $http) {
    $scope.obj = [];

    $scope.get_records = function() {
        $http({
            method: "get",
            url: "http://127.0.0.1:5000" + "/get-records"
        }).then(function(response) {
            if(response.data.msg === "SUCCESS") {
                musicLibraryData = response.data.musicLibraryData;
                $scope.obj = musicLibraryData[activeTrack];
                $scope.showHide();
            } else {
                console.log(response.data.msg);
                alert(response.data.msg);
            }
        },
        function(response) {});
    }

    $scope.get_records();

    $scope.changeTrack = function(direction) {
        activeTrack += direction;
        $scope.obj = musicLibraryData[activeTrack]
        $scope.showHide();
    }

    $scope.showHide = function() {
        $scope.hidePrev = (activeTrack === 0) ? true : false;
        $scope.hideNext = (activeTrack === musicLibraryData.length-1) ? true : false;
    }
});