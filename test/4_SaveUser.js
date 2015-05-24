// Include Hapi package
var Hapi = require('hapi');

// Include Joi package to validate request params and payload.
var Joi = require('joi');

// Create Server Object
var server = new Hapi.Server();

// Include Mongoose ORM to connect with database
var mongoose = require('mongoose');

// Making connection with `restdemo` database in your local machine
mongoose.connect('mongodb://localhost/restdemo');

// Importing `user` model from `models/user.js` file
var UserModel = require('../models/user');

// Define PORT number You can change it if you want
server.connection({port: 7002});

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register({
    register: require('hapi-swagger'),
    options: {
        apiVersion: "0.0.1"
    }
}, function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

server.route({
    method: 'POST',
    path: '/api/user',
    config: {
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Save user data',
        notes: 'Save user data',
        // We use Joi plugin to validate request
        validate: {
            payload: {
                // Both name and age are required fields
                name: Joi.string().required(),
                age: Joi.number().required()
            }
        }
    },
    handler: function (request, reply) {

        // Create mongodb user object to save it into database
        var user = new UserModel(request.payload);

        //Call save methods to save data into database and pass callback methods to handle error
        user.save(function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: error
                });
            } else {
                reply({
                    statusCode: 201,
                    message: 'User Saved Successfully'
                });
            }
        });
    }
});

// Lets start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});