var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(64).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 4096, 512, "sha256").toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 4096, 512, "sha256").toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    console.log("this", this)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "A20B9982-F138-49B2-9017-095D055E593B"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);