const models = require('../db/index');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const JWT_SECRET = 'secret';
const jwt = require('jsonwebtoken');

const jwtPassport = require('passport-jwt');
const Strategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

const token = jwt.sign({ foo: 'secret' }, JWT_SECRET);
console.log(token);

const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new Strategy(params, (payload, done) => {
    const email = payload.email;
    models.User.findOne({ email: email}, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            console.log('not user')
            return done(null, false, { message: 'Incorrect username.' });
        }
        return done(null, user);
    });
})

passport.use(strategy);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    console.log(email, password);
    models.User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            console.log('not user')
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validatePassword(password)) {
            console.log('not pwd')
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(user);
        return done(null, user);
      });
}
));

module.exports = passport;