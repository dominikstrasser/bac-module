angular.module("testApp", ["mytestModule"])
    .controller("testController", function($scope, guestProvider, roomProvider){
        $scope.guests = guestProvider.query();
        //guestProvider.test2({"test1" : "TEST1"});
        $scope.rooms = roomProvider.query();
        /*
        $scope.rooms = room.room();

        $scope.saveBooking = function(){
            booking.save($scope.newBooking);
        };

        $scope.saveGuest = function(){
            guest.save($scope.newGuest);
        };

        $scope.saveRoom = function(){
            room.save($scope.newRoom);
        };
        */
    });