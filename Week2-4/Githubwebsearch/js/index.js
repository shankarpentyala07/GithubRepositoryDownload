/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('myApp',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
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

