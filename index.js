var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var q = require("q");
var MongoClient = require("mongodb").MongoClient;
var routes = require("./routes/index.js");


//##### My Requirements #####
var dsat = require("./dsat-router/dsat-router.js");
dsat.root = "api";
dsat.moduleName = "mytestModule";



MongoClient.connect('mongodb://localhost:27017/bac-module', function(err, db) {

    app.use(bodyParser.json());

    var guestAPI = require("./api/guest.js")(db);
    var roomAPI = require("./api/room.js")(db);

    app.use("/api/guest", guestAPI);
    app.use("/api/room", roomAPI);

    //Serve public-folder files..
    dsat.createAngularService(function(err){
        if(err) console.log(err);
        console.log("createAngularService ok");
    });

    app.use(express.static(path.join(__dirname, 'public')));
    app.use("/", routes);


    app.listen(3000, function (err) {
        if (err) throw err;
        console.log("Express server listening on port 3000");
    });

});