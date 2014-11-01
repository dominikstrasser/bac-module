angular.module('mytestModule', ['ngResource'])
.factory('guestProvider', function($resource){
return $resource('api/guest/:_id',{},{
test: {method:'get', url:'api/guest/test', isArray:true}
,test2: {method:'post', url:'api/guest/test2', isArray:true}
});
})
.factory('roomProvider', function($resource){
return $resource('api/room/',{},{
testRoom: {method:'get', url:'api/room/testRoom', isArray:true}
});
})
;
