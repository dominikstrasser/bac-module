//var express = require("express");
//var router = express.Router();
var fs = require("fs");


var msg = "";

var dsat = function(pathToApi){

    fs.unlink(__dirname + "/../" + pathToApi + "services.js", function(err){
        if(err) console.log(err);
        console.log("unlink ok");
    });

    this.pathToApi = pathToApi;
	this.router = null;
    this.moduleName = "testM";
    this.factoryName = "testF";
    this.routes = new Array();
    this.config = {};
};


var route = function(path, method){
    this.path = path;
    this.method = method;
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


dsat.prototype.createAngularService = function(cb){

    var myRoutes = this.routes;

    this.msg ="angular.module('"+this.moduleName+"', ['ngResource'])\n"
    //console.log(myRoutes);
    for(r in myRoutes) {

        this.msg += ".factory('"+r+"', function($resource){\n";
        var isFirstCustomAction = true;
        this.msg += "return $resource('"+ myRoutes[r][0].path + ":id" + "', {id: '@_id'}, {\n";
        for(f  in myRoutes[r]) {
            if(myRoutes[r][f].name != '') {
                if(!isFirstCustomAction){
                    this.msg += ",";
                }
                this.msg += myRoutes[r][f].name + ": {method:'" + myRoutes[r][f].method + "', url:'" + myRoutes[r][f].path + "', isArray:true}\n";
                isFirstCustomAction = false
            }
        }
        this.msg += "});\n";
        this.msg += "})\n";
    }

    this.msg += ";\n";
    this.writeFile(this.pathToApi + "services.js", this.msg);
    cb(null);
};


/*
    addToRoutes()
    1) verbindet root und path zu einem objekt
    2) prüft ob methodenname generiert werden muss oder nicht (CRUD bei resource schon vorhanden)
     -> methodenname ist custom route
    3) fügt die route dem array an der stelle [factoryName] hinzu
 */
dsat.prototype.addToRoutes = function(route){
    var p = route.path.replace("/", "");
    route.path = this.root + route.path;

    route.name = p;

    /*
    if(this.config.hasOwnProperty(p)){
        p = this.config[p];
    }
    */
    if(!(this.factoryName in this.routes)){
        this.routes[this.factoryName] = new Array();
    }
    this.routes[this.factoryName].push(route);

};


dsat.prototype.get = function(path, cb){
    console.log("dsat.router get");
    this.addToRoutes(new route(path, "get"));
	this.router.get(path, cb);
};

dsat.prototype.post = function(path, cb){
    console.log("dsat.router post");
    this.addToRoutes(new route(path, "post"));
    this.router.post(path, cb);
};


module.exports = new dsat("public/api/");