const graphQLServer = require('graphql-yoga');
const mongoose = require('mongoose');

const dbconf = require('./config/db');
const models = require('./db');

const resolvers = require('./graphql/resolvers');
const permissions = require('./graphql/permissions');
const cors = require('cors');

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

const context = {
    models,
    db
};

getUser = (req) => {
    const auth = req.request.get('Authorization');
    if (auth == 'gu'){
        return {
                isAdmin: true
        }
    }else{
        return {
            unk:{
                isAdmin: false
            }
        }
    }
}

server = new graphQLServer.GraphQLServer({
    typeDefs: `${__dirname}/graphql/schema.graphql`,
    resolvers,
    middlewares:[permissions],
    context : req =>({
        ...req,
        user: getUser(req),
        models,
        db,
    }),
});

server
    .start(options, ({port}) => {
        console.log(`Server is running on http://localhost:${port}`);
    });