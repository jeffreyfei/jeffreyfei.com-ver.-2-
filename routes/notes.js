var express = require('express');
var router = express.Router();
var async = require('async');
var redisClient = require('redis').createClient();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type:'application/json' });
var fs = require('fs');
var upload = require('express-fileupload');

var checkDir = function(dir, callback) {
    fs.stat(dir, function(err, stats) {
        if(err && err.errno === 34) {
            fs.mkdir(dir, callback);
        } else {
            callback(err);
        }
    });
};
router.use(upload());
router.route('/upload/:filename')
    .post(function(request, response) {
        checkDir('./notes', function(err) {
            if(!request.files) {
                response.json('No files uploaded');
            } else {
                file = request.files.note;
                file.mv('./notes/' + request.params.filename, function(err) {
                    if(err) {
                        response.status(500).json('upload failed : ' + err);
                    } else {
                        response.json('note uploaded');
                    }
                });
            }                           
        });
    });
router.route('/add')
    .post(jsonParser, function(request, response) {
        var fileInfo = request.body;
        if(fileInfo.header !== undefined && fileInfo.course !== undefined && fileInfo.term !== undefined) {
            var input = {};
            input.header = fileInfo.header;
            if(fileInfo.cat !== 'class' && fileInfo.cat !== 'tut') {
                input.cat = 'others';
            } else {
                input.cat = fileInfo.cat;
            }
            if(fileInfo.date === undefined) {
                input.timestamp = new Date().getTime();
            } else {
                input.timestamp = new Date(fileInfo.date).getTime();
            }
            if(fileInfo.desc !== undefined) {
                input.desc = fileInfo.desc;
            }
            input.path = '/notes/' + fileInfo.term + '_' +  fileInfo.course + '_' + fileInfo.header + '.pdf';
            console.log(input.path);
            redisClient.sadd('terms', fileInfo.term, function(err) {
                if(!err) {
                    redisClient.sadd(fileInfo.term+';;term;;', fileInfo.course, function(err) {
                        if(!err) {
                            redisClient.sadd(fileInfo.course+';;course;;', fileInfo.header, function(err) {
                                if(!err) {
                                    redisClient.hmset(fileInfo.header+';;header;;', input, function(err) {
                                        console.log(input);
                                        if(!err) {
                                            response.json('note-data-appended');
                                        }
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
router.route('/courses/term/:term')
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
router.route('/courses/notes/:course')
    .get(function(request, response) {
        redisClient.smembers(request.params.course+';;course;;', function(err, notes) {
            if(!err) { 
                var output = [];
                if(notes !== undefined) {
                    async.each(notes, function(note, callback) { 
                        redisClient.hgetall(note+';;header;;', function(err, attrs) {
                            if(attrs !== undefined) {
                                time = new Date(parseInt(attrs.timestamp));
                                attrs.date = time.toDateString().split(' ').slice(1, 4).join(' ');
                                output.push(attrs); 
                            }
                            callback();
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
router.route('/courses/search/:note')
    .get(function(request, response) {
        redisClient.hgetall(request.params.note+';;header;;', function(err, attrs) {
            if(!err) {
                if(attrs !== undefined) {
                    time = new Date(parseInt(attrs.timestamp));
                    attrs.date = time.toDateString().split(' ').slice(1, 4).join(' ');
                    response.json(attrs);
                } else {    
                    response.status(404).json('Note not found');
                }
            } else {
                response.status(500).json('Server error : ' + err);
            }
        });
    });
module.exports = router;
