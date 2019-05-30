graphqlShield = require('graphql-shield');

const rule = graphqlShield.rule;
const shield = graphqlShield.shield;
const allow = graphqlShield.allow;
const and = graphqlShield.and;

const isAuthenticated = rule()(async (parent, args, context, info) => {
    return context.user !== null;
});

const isAdmin = rule()(async (parent, args, context, info) =>{
    return context.user.isAdmin === true;
});

const permissions = shield ({
    Query : {
        "*" : allow,
    },
    Mutation : {
        createCompany: and(isAdmin, isAuthenticated),
        createUser: allow,
        loginUser: allow,
    }
});

module.exports = permissions;
