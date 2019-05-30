const models = require('../db/index');

module.exports = function(){
    
    return {
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

