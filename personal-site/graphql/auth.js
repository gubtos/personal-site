const models = require('../db/index');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const jwtPassport = require('passport-jwt');

const Strategy = jwtPassport.Strategy;
const ExtractJwt = jwtPassport.ExtractJwt;

const JWT_SECRET = 'secret';

const params = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function(){
    const jwtStrategy = new Strategy(params, (payload, done) => {
        const id = payload.id || null;
        if(id){
            models.User.findOne({_id: id}, (err, user) => {
                if (err){ return done(err); }
                if (user){
                    return done(null, user);
                }
                return done(new Error("User not found"), null);
            });
        }
    });

    passport.use(jwtStrategy);
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    return {
        initialize: () =>{
            return passport.initialize();
        },
        jwtAuthenticate: () => {
            return passport.authenticate(['jwt'], { session: false }, (err, user, info) => {
                if (err) {
                    console.log(err);
                }
                if (user){
                    return done(null, user);
                }
                return res.status(400).json({ error: 'Something Wrong' });
            });  
        },
        
        generateJWT: (email, password, res) =>{

            models.User.findOne({ email: email }, (err, user) => {
                if (err) { console.log(err); }
                if (!user) {
                    return res.status(422).json({ 
                        err: Error('Incorrect Username'),
                        user: null,
                        message: 'Incorrect username.' 
                    });
                }
                if (!user.validatePassword(password)) {
                    return res.status(422).json({ 
                        err: Error('Incorrect Password'),
                        user: null,
                        message: 'Incorrect password.' 
                    });
                }else{
                    res.json({
                        token: user.generateJWT(),
                        id: user._id,
                    });
                }
            });

        }
    }

}

