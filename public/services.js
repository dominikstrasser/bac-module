angular.module('myService', ['ngResource'])
.factory('userService', function($resource){
return $resource('api/user', {}, {
userService: {method:'get', params:{}, isArray:true},
userService1: {method:'post', params:{"test":"test"}, isArray:true}
});
})
.factory('booking', function($resource){
return $resource('api/booking', {}, {
booking: {method:'get', params:{}, isArray:true}
});
})
.factory('testService', function($resource){
return $resource('api/test', {}, {
testService: {method:'get', params:{}, isArray:true}
});
})
;
