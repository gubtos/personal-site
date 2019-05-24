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
            try{
                const newUser = await models.User.create({name, email, isAdmin, password});
                return newUser;
            }catch(e){
                if (e.code === 11000){
                    throw new Error('Error: Email already used');
                }
                else{
                    throw new Error('Error: User cannot saved');
                }
            }
        },
        checkUser : async(parent, {email, password}, {models}) =>{
            let checked = false;
            const user = await models.User.findOne({'email':email}, (err, obj)=>{
                if(obj){
                    checked = obj.validatePassword(password);
                }
            });
            return checked;
        }
    }
};
