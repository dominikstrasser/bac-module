dsat.get("/booking", function (req, res) {
    db.collection("room").find().toArray(function (err, docs) {
        res.send(docs);
    });
});