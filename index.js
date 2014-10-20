var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
app.use(bodyParser.json());
var routes = require("./routes/index.js");

var dsat = require("./dsat-router/dsat-router.js");

dsat.config = {
    "test" : "testService",
    "user" : "userService"
};
dsat.root = "api";


dsat.get("/user", function(req, res){
    res.json(require("./data.json"));
});
dsat.post("/user", function(req, res){
    res.send("TEST");
});
dsat.get("/booking", function(req, res){
    res.send("TEST");
});

dsat.get("/test", function(req, res){
    res.json(require("./data.json"));
});


dsat.createAngularService(function(err){
    if (err) console.log(err);
});

app.use("/api/", dsat.router);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/",routes);

app.listen(3000, function(){
    console.log("Express server listening on port 3000");
});