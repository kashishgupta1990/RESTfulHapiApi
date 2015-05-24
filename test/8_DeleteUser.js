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
    method: 'DELETE',
    path: '/api/user/{id}',
    config: {
        tags: ['api'],
        description: 'Remove specific user data',
        notes: 'Remove specific user data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: function (request, reply) {

        // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
        UserModel.findOneAndRemove({_id: request.params.id}, function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Error in removing User',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Deleted Successfully'
                });
            }
        });

    }
});

// Lets start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});