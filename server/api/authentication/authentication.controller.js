'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

exports.register = function(req, res) {

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    // console.log("req | ", req)
    // console.log("req body | ", req.body)
    console.log("user | ", user)

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });

};

exports.login = function(req, res) {

    passport.authenticate('local', function(err, user, info) {

        var token;
        var _user = user;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            console.log('user | ',user)
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token,
                "user" : _user,
                "test":"test"
            });

        } else {
            // If user is not found
            res.status(401).json(info);
        }

    })(req, res);

};
