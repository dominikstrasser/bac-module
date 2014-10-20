var express = require("express");
var router = express.Router();
var fs = require("fs");

var test = "angular.module('pro5_hzv.bookingService', ['ngResource']).factory('bookingService', function($resource){return $resource('api/booking/getCurrentArrivals/', {}, {currentArrivals: {method:'GET', params:{}, isArray:true}});});"

var dsat = function(){	
	this.router = router;
	console.log("dsat");

};
dsat.prototype.writeFile = function(path, msg){
	if(fs.exists(path),function(e){
		console.log("file existiert");
	});
		/*
	fs.unlink(path, function (err) {
		if (err) throw err;
	  	console.log('successfully deleted /tmp/hello');
	});
*/
	fs.writeFile(path, msg, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	}
});
};

dsat.prototype.get = function(path, params){
	console.log("path: " + path);
	console.log("params: " + params);
	this.writeFile("test.js", test);
	router.get("/", function(req, res){
		console.log("get : /");
		res.send("TEST");
	});
};


module.exports = new dsat();