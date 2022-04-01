const fs = require('fs');
const express = require('express');
const {ApolloServer, UserInputError} = require('apollo-server-express');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost/Hido';

let db;

let aboutMessage = "Hido tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return  new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
});

const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage,
    },
    GraphQLDate,
};

function setAboutMessage(_, {message}) {
    return aboutMessage = message;
}

async function connectToDb() {
    const client = new MongoClient(url, {useNewUrlParser: true});
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

const app = express();

app.use(express.static('public'));

(async function () {
    try {
        await server.start();
        server.applyMiddleware({app, path: '/graphql'});
        await connectToDb();
        app.listen(5000, function () {
            console.log('App started on port 5000');
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();