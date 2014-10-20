angular.module("testApp", ["myService"])
    .controller("testController", function($scope, userService){

        $scope.test = userService.userService();
    });