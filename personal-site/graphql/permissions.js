graphqlShield = require('graphql-shield');
passport = require('./passport');

const rule = graphqlShield.rule;
const shield = graphqlShield.shield;
const allow = graphqlShield.allow;
const and = graphqlShield.and;

const isAuthenticated = rule()(async (parent, args, context, info) => {
    return context.request.res.locals.user !== null;
});

const isAdmin = rule()(async (parent, args, context, info) =>{
    return context.request.res.locals.user.isAdmin === true;
});

const permissions = shield ({
    Query : {
        "*" : allow,
    },
    Mutation : {
        createCompany: and(isAdmin, isAuthenticated),
        createUser: and(isAuthenticated),
    }
});

module.exports = permissions;
