const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    isAdmin: Boolean,
    password: String,
    salt: String
});

// Mongoose don't work with arrow functions

UserSchema.pre('save', function(next){
    var user = this;
    user.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(user.password, user.salt, 10000, 512, 'sha512', (err, hash) => {
            if(err){
                return next(err);
            }
            user.password = hash;
            next();         
        }
    );
});

UserSchema.methods.validatePassword = function(password){
    const validated = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512');
    return validated == this.password;
}

UserSchema.methods.generateJWT = function(){
    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function(){
    return {
        _id : this._id,
        email : this.email,
        token : this.generateJWT()
    };
};

module.exports = mongoose.model('User', UserSchema);