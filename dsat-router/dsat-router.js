var express = require("express");
var router = express.Router();
var fs = require("fs");

var dsat = function(module, service ){
	this.router = router;
	console.log("dsat");
    this.msg = "";
    this.moduleName = module;
    this.serviceName = service;
    this.routes = new Array();
    this.config = {};
};




var route = function(path, method, params){
    this.path = path;
    this.method = method;
    this.params = params;
};



dsat.prototype.writeFile = function(path, msg){
	fs.writeFile(path, msg, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
    });
};


dsat.prototype.createAngularService = function(){

    var myRoutes = this.routes;

    this.msg ="angular.module('"+this.moduleName+"', ['ngResource'])\n"

    for(r in myRoutes) {


        this.msg += ".factory('"+r+"', function($resource){\n";
        this.msg += "return $resource('"+ myRoutes[r][0].path +"', {}, {\n";
        for(f in myRoutes[r]) {
            this.msg += r + ": {method:'" + myRoutes[r][f].method + "', params:{" + myRoutes[r][f].params + "}, isArray:true}\n";
        }
        this.msg += "});\n";
        this.msg += "})\n";

    }

    this.msg += ";\n";
    this.writeFile("public/services.js", this.msg);

};

dsat.prototype.addToRoutes = function(route){
    var p = route.path.replace("/", "");
    route.path = this.root + route.path;
    if(this.config.hasOwnProperty(p)){
        p = this.config[p];
    }
    if(!(p in this.routes)){
        this.routes[p] = new Array();
    }
    this.routes[p].push(route);
};



dsat.prototype.get = function(path, cb){
    this.addToRoutes(new route(path, "get", []));
	router.get(path, cb);
};

dsat.prototype.post = function(path, cb){
    this.addToRoutes(new route(path, "post", []));
    router.post(path, cb);
};


module.exports = new dsat("myService", "bookingS");