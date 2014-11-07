
var dsat = require("./../dsat-router/dsat-router.js");
var mongodb = require("mongodb");

module.exports = function(db) {

    function guestDAO(){
        this.getGuests = function(req, res, next){
            console.log("api/guest/ - getAll");
            db.collection("guest").find().toArray(function (err, docs) {
                res.json(docs);
            });
        };

        this.getGuest = function(req, res, next){
            console.log("api/guest/ - get");
            console.log(req.params._id);
            db.collection("guest").findOne({'_id' : mongodb.ObjectID(req.params._id)},function (err, docs) {
                res.json(docs);
            });
        };

        this.postGuest = function (req, res, next) {
            console.log("api/guest/ - post");
            console.log(req.body);
            db.collection("guest").save(req.body, function (err, docs) {
                res.json(docs);
            });
        };

        this.putGuest = function (req, res, next) {
            console.log("api/guest/ - put");
            console.log(req.params._id);
            console.log(req.body);
            db.collection("guest").update({'_id' : mongodb.ObjectID(req.params._id)}, req.body, function (err, docs) {
                res.json(docs);
            });

        };

        this.deleteGuest = function (req, res, next) {
            console.log("api/guest/ - delete");
            db.collection("guest").remove({"_id" : mongodb.ObjectID(req.params._id)}, function (err, docs) {
                res.json(docs);
            });
        };
    }

    dsat.router = require("express").Router();
    dsat.factoryName = "guestProvider";
    dsat.root = "api/guest";
    var guestDAO = new guestDAO();

    dsat.post("/", guestDAO.postGuest);
    dsat.get("/", guestDAO.getGuests);
    dsat.get("/:_id", guestDAO.getGuest);
    dsat.put("/:_id", guestDAO.putGuest);
    dsat.delete("/:_id", guestDAO.deleteGuest);


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