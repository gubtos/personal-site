const models = require('../db/index');

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
        }
    }
};
