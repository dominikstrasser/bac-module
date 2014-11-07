angular.module("testApp", ["mytestModule"])
    .controller("testController", function($scope, guestProvider, roomProvider){
        $scope.guests = guestProvider.query();
        //guestProvider.test2({"test1" : "TEST1"});
        $scope.rooms = roomProvider.query();

        $scope.saveGuest = function(){
            guestProvider.save($scope.newGuest,function(docs){
                console.log("saved");
                console.log(docs);
                $scope.guests.push(docs);
          });
        };

        $scope.deleteGuest = function(guest, id){
            console.log(id);
            guestProvider.remove({"_id" : guest._id},function(docs){
                console.log("deleted");
                console.log(docs);
                $scope.guests.splice(id, 1);
            });
        };

        $scope.updateGuest = function(){
            guestProvider.update({_id :"545d33ce1740089d43d8bc61"}, $scope.newGuest,function(docs){
                console.log("update");

            });
        };

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