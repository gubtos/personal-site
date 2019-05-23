const graphQLServer = require('graphql-yoga');
const mongoose = require('mongoose');

const dbconf = require('./config/db');
const models = require('./db');

const resolvers = require('./graphql/resolvers');
const permissions = require('./graphql/permissions');
const cors = require('cors');
const bodyParser = require('body-parser');

const passport = require('./graphql/passport');

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

getUser = (req) => {
    const auth = req.request.get('Authorization');
    if (auth == 'gu') {
        return {
            isAdmin: true
        }
    } else {
        return {
            unk: {
                isAdmin: false
            }
        }
    }
}

const server = new graphQLServer.GraphQLServer({
    typeDefs: `${__dirname}/graphql/schema.graphql`,
    resolvers,
    middlewares: [permissions],
    context: req => ({
        ...req,
        user: getUser(req),
        models,
        db,
    }),
});

server.express.use(bodyParser.json());

server.express.use((req, res, next) => {
    passport.authenticate(['jwt','local'], { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (user){
            return next();
        }
        return res.status(400).json({ error: 'Something Wrong' });
    })(req, res, next);    

});

server.express.post('/login', (req, res, next) => {
    const user = req.body;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }
        return res.status(400).json({ error: 'Something Wrong' });
    })(req, res, next);
}
);

server
    .start(options, ({ port }) => {
        console.log(`Server is running on http://localhost:${port}`);
    });