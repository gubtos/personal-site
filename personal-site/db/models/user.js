const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    isAdmin: Boolean,
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = (password) => {
    var user = this;
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512');
    console.log(user);
};

UserSchema.methods.validatePassword = (password) =>{
    const validated = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512');
    return validated === this.salt;
}


module.exports = mongoose.model('User', UserSchema);