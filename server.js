var express = require('express');
var app = express();

var port = 8080;

app.use(express.static('./site'));

app.listen(port, function() {
    console.log("Server running on port " + port);
});
