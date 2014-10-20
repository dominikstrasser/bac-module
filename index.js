var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
app.use(bodyParser.json());
var routes = require("./routes/index.js");
var dsat = require("./dsat-router/dsat-router.js");

dsat.get("/", ["test1", "test2"]);

app.use("/api/", dsat.router);

app.use(express.static(path.join(__dirname, 'public')));
app.use("/",routes);

app.listen(3000, function(){
console.log("Express server listening on port 3000");
});