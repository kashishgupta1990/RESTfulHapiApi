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
    method: 'PUT',
    path: '/api/user/{id}',
    config: {
        // Swagger documentation fields tags, description, note
        tags: ['api'],
        description: 'Update specific user data',
        notes: 'Update specific user data',

        // Joi api validation
        validate: {
            params: {
                //`id` is required field and can only accept string data
                id: Joi.string().required()
            },
            payload: {
                name: Joi.string(),
                age: Joi.number()
            }
        }
    },
    handler: function (request, reply) {

        // `findOneAndUpdate` is a mongoose modal methods to update a particular record.
        UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Updated Successfully',
                    data: data
                });
            }
        });

    }
});

// Lets start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});