
var dsat = require("./../dsat-router/dsat-router.js");

module.exports = function(db) {
    dsat.router = require("express").Router();
    dsat.factoryName = "roomProvider";
    dsat.root = "api/room";

    dsat.get("/", function (req, res) {
        console.log("api/room/ - get");
        db.collection("room").find().toArray(function (err, docs) {
            res.json(docs);
        });
    });

    dsat.get("/testRoom", function (req, res) {
        console.log("api/room/testRoom - get");
        db.collection("room").find().toArray(function (err, docs) {
            res.json(docs);
        });
    });


    return dsat.router;
};