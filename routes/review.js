var express = require('express');
var router = express.Router();
var async = require('async');
var redisClient = require('redis').createClient();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ type: 'application/json' });
var fs = require('fs');
// Credential file
var cred = JSON.parse(fs.readFileSync('cred.json', 'utf8'));
var domain = 'http://jeffreyfei.com/';

var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: cred.gmailUser,
        pass: cred.gmailPass
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

router.route('/note/:note')
    .post(jsonParser, function(request, response) {
        var review = request.body;
        var d = new Date();
        if('name' in review && 'title' in review && 'comments' in review && 'email' in review) { 
            // Get date in the format of MMM DD YYYY
            review.date = d.toDateString().split(' ').splice(1, 4).join(' ');
            // More accurate timestamp
            review.timestamp = Date.now();
            // Generate review ID
            var hash = Date.now();
            for(var i = 0; i < review.name.length; i++) {
                hash += review.name.charCodeAt(i);
            }
            var id = request.params.note + '_' + hash;
            // add review to database 
            if(review.email.indexOf('uwaterloo.ca') > -1) {
                redisClient.hmset(id, review, function(err) {
                    if(!err) {
                         redisClient.smembers('email-whitelist', function(err, emails) {
                            // If ID is already on whitelist, append comment
                            if(emails.indexOf(review.email) > -1) {
                                redisClient.sadd(request.params.note+';;review;;', id, function(err) {
                                    if(!err) {
                                        response.json('review added');
                                    } else {
                                        console.log('Internal server error : err');
                                        response.status(500).json('unable to add review : ' + err);
                                    }
                                });
                            } else {
                                // Verify if its a waterloo email
                                redisClient.sadd(request.params.note+';;pendingreview;;', id, function(err) {
                                    if(!err) {
                                        var address = domain + '#verify/' + request.params.note + ';id='+id;
                                        address = address.replace(/ /g, '%20');
                                        var mailOptions = {
                                            from: 'Jeffrey Fei Autoreply <'+cred.gmailUser+'>',
                                            to: review.email,
                                            subject: 'E-mail Verification',
                                            text: 'Thank you for leaving your comment! Please click the link below to verify your E-Mail:\n'+address
                                        };
                                        // Send verification mail
                                        transporter.sendMail(mailOptions, function(err, info) {
                                            if(err) {
                                                response.status(500).json('unable to add review : ' + err);
                                            } else {
                                                response.json('verification sent');
                                            }
                                        });
                                    } else {
                                        response.status(500).json('unable to add review : ' + err);
                                    }
                                });
                            }
                        }); 
                    } else {
                        response.status(500).json('unable to add review : ' + err);
                    }
                });
            } else {
                response.status(401).json('not-waterloo');
            }
        } else {
            response.status(400).json('invalid format');
        }
    })
    .get(function(request, response) {
        redisClient.smembers(request.params.note+';;review;;', function(err, ids) {
            if(!err) {
                if(ids !== undefined) {
                    var reviews = [];
                    async.each(ids, function(id, callback) {
                        redisClient.hgetall(id, function(err, review) {
                            if(review !== undefined) {
                                reviews.push(review);
                            }
                            callback();
                        });
                    }, function() {
                        response.json(reviews); 
                    });
                } else {
                    response.status(404).json('review not found');
                }
            } else {
                response.status(500).json('unable to get review : ' + err);
            }
        });
    });

router.route('/verify/:info')
    .post(function(request, response) {
        var info = request.params.info;
        // Check format
        if(info !== undefined && info.indexOf(';id=') > -1) {
            var note = info.split(';id=')[0];
            var id = info.split(';id=')[1];
            var hasItem = false;
            redisClient.smembers(note+';;pendingreview;;', function(err, reviews) { 
                if(!err && reviews !== undefined) {
                   async.each(reviews, function(review, callback) {
                        if(review === id) {
                            hasItem = true;
                            redisClient.hgetall(id, function(err, reviewAttrs) {
                                if(!err) {
                                    redisClient.sadd('email-whitelist', reviewAttrs.email, function(err) {
                                        if(!err) {
                                            redisClient.sadd(note+';;review;;', id, function(err) {
                                                if(!err) {
                                                    redisClient.srem(note+';;pendingreview;;', id, function(err) {
                                                        if(err) {
                                                            console.log(err);
                                                        }
                                                        callback();
                                                    });
                                                } else {
                                                    console.log(err);
                                                    callback();
                                                }
                                            });
                                        } else {
                                            callback();
                                        }
                                    });
                                } else {
                                    console.log(err);
                                    calllback();
                                }
                            });
                        } else {
                            callback();
                        }
                   }, function() {
                        if(hasItem) {
                            response.json('email-verified');
                        } else {
                            response.status(404).json('item does not exist');
                        }
                   });
                } else {
                    response.status(500).json('unable to verify : ' + err);
                }
            });
        } else {
            response.status(400).json('invalid format');
        }
    });
module.exports = router;
