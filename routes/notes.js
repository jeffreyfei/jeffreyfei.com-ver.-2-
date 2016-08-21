var express = require('express');
var router = express.Router();
var async = require('async');
var redisClient = require('redis').createClient();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type:'application/json' });
var fs = require('fs');

var checkDir = function(dir, callback) {
    fs.stat(dir, function(err, stats) {
        if(err && err.errno === 34) {
            fs.mkdir(dir, callback);
        } else {
            callback(err);
        }
    });
};
router.route('/add')
    .post(jsonParser, function(request, response) {
        var fileInfo = request.body;
        if(fileInfo.header !== undefined && fileInfo.course !== undefined && fileInfo.term !== undefined) {
            input = {};
            input.header = fileInfo.header;
            if(fileInfo.date === undefined) {
                input.timestamp = new Date().getTime();
            } else {
                input.timestamp = new Date(fileInfo.date).getTime();
            }
            if(fileInfo.desc !== undefined) {
                input.desc = fileInfo.desc;
            }
            input.path = __dirname + '/notes/' + fileInfo.term + '/' + fileInfo.course + '/' + header;
            redisClient.sadd('terms', fileInfo.term, function(err) {
                if(!err) {
                    redisClient.sadd(fileInfo.term+';;term;;', fileInfo.course, function(err) {
                        if(!err) {
                            redisClient.sadd(fileInfo.course+';;course;;', fileInfo.header, function(err) {
                                if(!err) {
                                    redisClient.hmset(fileInfo.header+';;header;;', input, function(err) {
                                        checkDir('./notes', function(err) {
                                            checkDir('./notes/' + fileInfo.term, function(err) {
                                                checkDir('./notes/' + fileInfo.term + '/' + fileInfo.course, function(err) {
                                                    var note = fs.createWriteStream(input.path);
                                                    request.pipe(note);
                                                    request.on('end', function() {
                                                        response.json('upload successful');
                                                    });  
                                                });
                                            });                              
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
router.route('/terms')
    .get(function(request, response) {
        redisClient.smembers('terms', function(err, terms) {
            if(!err) {
                response.json(terms);
            } else {
                response.status(500).json('Server error : ' + err);
            }
        });
    });
router.route('/courses/:term')
    .get(function(request, response) {
        redisClient.smembers(request.params.term+';;term;;', function(err, courses) {
            if(!err) {
                if(courses !== undefined) {
                    response.json(courses);
                } else {
                    response.status(404).json('Term not found');
                }
            } else {
                response.status(500).json('Server error : ' + err);                
            }
        });
    });
router.route('/notes/:course')
    .get(function(request, response) {
        redisClient.smembers(request.params.course+';;course;;', function(err, notes) {
            if(!err) { 
                var output = [];
                if(notes !== undefined) {
                    async.each(notes, function(note, callback) { 
                        redisClient.hgetall(note, function(err, attrs) {
                            output.push(attrs); 
                        });
                    }, function() {
                        response.json(output); 
                    });
                } else {
                    response.status(404).json('Term not found');
                }
            } else {
                response.status(500).json('Server error : ' + err);
            }
        });
    });
module.exports = router;
