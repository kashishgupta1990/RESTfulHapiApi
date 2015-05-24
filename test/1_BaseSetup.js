// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('hapi');

// Create Server Object
var server = new Hapi.Server();

// Define PORT number
server.connection({port: 7002});

// =============== Routes for our API =======================
// Define GET route
server.route({
    method: 'GET',      // Methods Type
    path: '/api/user',  // Url
    handler: function (request, reply) { //Action

        // Response JSON object
        reply({
            statusCode: 200,
            message: 'Getting All User Data',
            data: [
                {
                    name:'Kashish',
                    age:24
                },
                {
                    name:'Shubham',
                    age:21
                },
                {
                    name:'Jasmine',
                    age:24
                }
            ]
        });
    }
});

// =============== Start our Server =======================
// Lets start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});