// 'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myApp', []);


myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('View1Ctrl', function ($scope, $http) {
    $scope.venueList = new Array();
    $scope.mostRecentReview;
    $scope.getVenues = function () {
        var placeEntered = document.getElementById("txt_placeName").value;
        var searchQuery = document.getElementById("txt_searchFilter").value;
        if (searchQuery != null && searchQuery != "") {

            //This is the API that gives the list of venues based on the place and search query.
            /*   var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                   "?client_id=<Provide your client id>" +
                   "&client_secret=<Provide your client secret>" +
                   "&v=20160215&limit=5" +
                   "&near=" + placeEntered +
                   "&query=" + searchQuery); */

            var handler = $http.get("https://api.github.com/search/repositories" +
                "?q=" +searchQuery  +
                "+&sort=stars&order=desc");
            handler.success(function (data) {
                if (data != null) {
                    console.log(data.items);
                    console.log(data.items.length);
                    $scope.venueList = data.items;
                    // Tie an array named "venueList" to the scope which is an array of objects.
                    // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                    // Marks will be distributed between logic, implementation and UI
                }
            })
            handler.error(function (data) {
                console.log("failure");
                alert("There was some error processing your request. Please try after some time.");
            });
        }
    }
});

myapp.controller('MongoRestController',['$scope','$http','$location','$window',function($scope,$http,$location,$window){
    $scope.getData = function () {
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get('http://127.0.0.1:8081/getData',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);

            $scope.userlist = new Array();

            for (var i = 0; i < data.length; i++) {
                $scope.userlist[i] = {
                    '_id' : data[i]._id,
                    'Name' : data[i].Name,
                    'Type' : data[i].Type,
                    'Accuracy' : data[i].Accuracy,
                    'Language' : data[i].Language,
                    'Url' : data[i].Url

                }
            }
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }
}]);
