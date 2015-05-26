# RESTful Hapi Api

With the increasing popularity of Hapi in the Node community, it is a good option to build our API’s using this framework. Lets understand the Hapi framework and how easily we can define routes to build Hapi RESTful API for production ready environment. We will also be using some of the Hapi plugin’s for ease of API’s validation and to test routes.

Lets look at the API we want to build and what it can do.

### Our Application

* Handle CRUD for an item ( we’re are going to use `user` )
* Have a standard URL( “http://demo.com/api/user” and “http://demo.com/api/user/:id” )
* Use the proper HTTP verbs to make it RESTful ( GET, POST, PUT, and DELETE )
* Return JSON data
* Log all request to the console

### Hapi Routes

* /api/user	GET	Get all the users.
* /api/user	POST	Create a new user.
* /api/user/{id}	GET	Get a single user.
* /api/user/{id}	PUT	Update a user with new info.
* /api/user/{id}	DELETE	Delete a user.

Refer my blog which describe and walk through step-by-step process of making RESTful Hapi API using `NodeJS` or `iojs`

[Click me] to read more.

[Click me]:http://www.tothenew.com/blog/build-restful-api-using-node-and-hapi/
