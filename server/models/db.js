'use strict';

var mongoose = require('mongoose');
var gracefulShutdown;
var uri = "mongodb://192.168.1.101:27017/LawSite";

if (process.env.NODE_ENV === 'production') {
    uri = process.env.MONGOLAB_URI;
}

var opt = {
    user: 'username',
    pwd: 'password'
};

var MongoDB = mongoose.connect(uri, opt).connection;

MongoDB.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

MongoDB.once('open', function () {
    console.log('Mongoose connected to ' + uri);
});

MongoDB.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./users');

module.exports = mongoose;