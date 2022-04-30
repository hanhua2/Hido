const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const {ApolloServer, UserInputError} = require('apollo-server-express');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const {MongoClient} = require('mongodb');
const { v4: uuidv4 } = require('uuid');

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
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
});

const validateRegisterInput = (
    lastname, firstname, email, password, confirmPassword
) => {
    const errors = {};
    if (lastname.trim() === "") {
        errors.lastname = 'Lastname must not be empty, please try again';
    }
    if (firstname.trim() === "") {
        errors.firstname = 'Firstname must not be empty, please try again';
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty, please try again';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address, please try again';
        }
    }
    if (password === '') {
        errors.password = 'Password must not empty';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

const validateLoginInput = (
    email, password
) => {
    const errors = {};
    if (email.trim() === '') {
        errors.email = 'Email must not be empty, please try again';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address, please try again';
        }
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

const resolvers = {
    Query: {
        about: () => aboutMessage,
        taskList,
        userList,
    },
    Mutation: {
        setAboutMessage,
        registeruser,
        login,
        taskAdd,
        taskDelete,
        taskUpdate,
    },
    GraphQLDate,
};

function setAboutMessage(_, {message}) {
    return aboutMessage = message;
}

async function userList() {
    const users = await db.collection('users').find({}).toArray();
    return users;
}

async function taskList() {
    const tasks = await db.collection('tasks').find({}).toArray();
    return tasks;
}

async function registeruser(_, {
    registerInput: {lastname, firstname, email, password, confirmPassword}
}) {
    const {errors, valid} = validateRegisterInput(lastname, firstname, email, password, confirmPassword);
    if (!valid) {
        throw new UserInputError('Errors', {errors});
    }

    const user = await db.collection('users').findOne({'email': email})

    if (user) {
        throw new UserInputError('Email has been taken.', {
            errors: {
                email: 'This email has been taken'
            }
        });
    }


    password = await bcrypt.hash(password, 12);
    console.log(password)
    const result = await db.collection('users').insertOne({
        "id":uuidv4(), "lastname":lastname, "firstname":firstname, "email":email, "password":password, "created": new Date()
    })

    const savedUser = await db.collection('users')
        .findOne({_id: result.insertedId});

    console.log("Register Successful!")
    return savedUser;
}

async function login(_, {email, password}){
    const {errors, valid} = validateLoginInput(email, password);

    if (!valid) {
        throw new UserInputError('Errors', { errors });
    }

    const user = await db.collection('users').findOne({'email': email});

    if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        errors.general = 'Wrong password';
        throw new UserInputError('Wrong password', { errors });
    }
    else{
        console.log("Login Successful!")
    }

    return user;
}

async function taskAdd(_, {task}) {
    const result = await db.collection('tasks').insertOne(task);
    const savedTask = await db.collection('tasks')
        .findOne({_id: result.insertedId});
    return savedTask;
}

async function taskDelete(_, {taskID}) {
    const deletedTask = await db.collection('tasks').findOne({id: taskID});
    const result = await db.collection('tasks').deleteOne(
        {id: taskID}
    );
    return deletedTask;
}
[{"date":"2022-04-14T16:00:00.000Z","name":"a","color":"#ff9800","status":"To do","priority":"Normal","comment":"","id":"80110c64-856d-4a5b-a907-e8533f94edd4"}]

async function taskUpdate(_, {task}) {
    const deletedTask = await db.collection('tasks').findOne({id: task.id});
    const deleteResult = await db.collection('tasks').deleteOne(
        {id: task.id}
    );
    const result = await db.collection('tasks').insertOne(task);
    const savedTask = await db.collection('tasks')
        .findOne({_id: result.insertedId});
    return savedTask;
}

/*
async function setDb(_, { db }) {

    const deletedTask = await db.collection('tasks').findOne({ id: taskID });
    const result = await db.collection('tasks').deleteOne(
        {id :  taskID}
    );
    return deletedTask;
} */


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
