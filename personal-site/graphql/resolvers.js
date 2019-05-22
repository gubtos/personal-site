const models = require('../db/index');
const crypto = require('crypto');

module.exports = {
    Query: {
        companies: async (parent, args, {models}) => {
            const Companies = await models.Company.find({});
            return Companies;
        },
    },
    Mutation: {
        createCompany: async(parent, {name, year, description}, {models}) =>{
            const newCompanie = models.Company({
                name, year, description
            });
            try{
                await newCompanie.save();
            }catch(e){
                throw new Error('Cannot save companie');
            }
            return newCompanie;
        },
        createUser : async(parent, {name, email, password}, {models}) =>{
            const isAdmin = false;
            
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
            
            const newUser = models.User({
                name, email, isAdmin, salt, hash
            });
            console.log(newUser);
            try{
                await newUser.save();
            }catch(e){
                console.log(e);
                throw new Error('Cannot save user');
            }
            return newUser;
        },
        checkUser : async(parent, {email, password}, {models}) =>{
            let checked = false;
            const user = await models.User.findOne({'email':email}, (err, obj)=>{
                if(obj){
                    hash = crypto.pbkdf2Sync(password, obj.salt, 10000, 512, 'sha512');
                    if(hash == obj.hash){
                        checked = true;
                    }
                }
            });
            return checked;
        }
    }
};
