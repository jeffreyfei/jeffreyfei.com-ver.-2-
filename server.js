var express = require('express');
var app = express();
var notes = require('./routes/notes');
var review = require('./routes/review');
var path = require('path');

var port = 8080;

app.use(express.static('./site'));
app.use('/noteSvc', notes);
app.use('/review', review);
app.use('/notes', express.static(path.join(__dirname, 'notes')));

app.listen(port, function() {
    console.log("Server running on port " + port);
});
