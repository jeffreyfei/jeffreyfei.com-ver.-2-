var express = require('express');
var app = express();
var notes = require('./routes/notes');

var port = 8080;

app.use(express.static('./site'));
app.use('/notes', notes);

app.listen(port, function() {
    console.log("Server running on port " + port);
});
