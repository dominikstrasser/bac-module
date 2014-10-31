
var dsat = require("./../dsat-router/dsat-router.js");


module.exports = function(db) {
    dsat.router = require("express").Router();
    dsat.factoryName = "guestProvider";
    dsat.root = "api/guest";

    dsat.get("/", function (req, res) {
        console.log("api/guest/ - get");
        db.collection("guest").find().toArray(function (err, docs) {
            res.json(docs);
        });
    });

    dsat.post("/", function (req, res) {
        db.collection("guest").save(req.body, function (err, docs) {
            res.json(docs);
        });

    });
    // get a specific route
    dsat.get("/test", function (req, res) {
        db.collection("guest").save(req.body, function (err, docs) {
            res.json(docs);
        });

    });

    dsat.post("/test2", function (req, res) {
        console.log("api/guest/test2 - post");
        db.collection("guest").save(req.body, function (err, docs) {
            if (err) console.log(err);
            console.log(docs);
            res.json(docs);

        });

    });

    return dsat.router;
};