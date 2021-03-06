'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var _ = require('underscore-node');
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
        var _user = _.clone(user);

        _user = _.pick(_user, ["name","email"])

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token,
                "user" : _user
            });

        } else {
            // If user is not found
            res.status(401).json(info);
        }

    })(req, res);

};
