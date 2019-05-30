const graphQLServer = require('graphql-yoga');
const mongoose = require('mongoose');

const dbconf = require('./config/db');
const models = require('./db');

const resolvers = require('./graphql/resolvers');
const permissions = require('./graphql/permissions');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const options = {
    port: process.env.PORT || 8000,
    endpoint: "/graphql",
    cors: {
        credentials: true,
        origin: ["http://localhost:8000"]
    }
};

const db = mongoose
    .connect(
        dbconf.url,
        {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Authentication in Apolo server
// url: https://blog.apollographql.com/a-guide-to-authentication-in-graphql-e002a4039d1
// url: https://www.apollographql.com/docs/apollo-server/features/authentication
getUser = async (token) => {
    try{
        const user = jwt.verify(token, 'secret');
        const usero = await models.User.findOne({_id: user.id},'-password -salt');
        return usero;
    }
    catch (err){
        return null;
    }
}    

const server = new graphQLServer.GraphQLServer({
    typeDefs: `${__dirname}/graphql/schema.graphql`,
    resolvers,
    middlewares: [permissions],
    context: async (req) => {
        const tokenWithBearer = req.request.headers.authorization || '';
        const token = tokenWithBearer.split(' ')[1];
        const user = await getUser(token);
        return {
            req,
            user,
            models,
            db,
        }
    },    
});

// see Apolo docs resolver
// url: https://www.apollographql.com/docs/apollo-server/essentials/data
(parent, _, context) => {
    return context.user;
}

server
    .start(options, ({ port }) => {
        console.log(`Server is running on http://localhost:${port}`);
    });