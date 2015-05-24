// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('hapi');

// Create Server Object
var server = new Hapi.Server();

// Define PORT number
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

// =============== Routes for our API =======================
// Define GET route
server.route({
    method: 'GET',      // Methods Type
    path: '/api/user',  // Url
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Get All User data',
        notes: 'Get All User data'
    },
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