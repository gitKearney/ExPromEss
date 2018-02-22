# An Express application that uses promises instead of callbacks

In trying to better understand Promises (and for an upcoming talk where I compare
PHP and Node based APIs) I've created this project as a learning tool for anyone
to better understand Node promises.

The premise is simple

    HTTP Request -> index -> route -> controller -> service -> model

So, all HTTP requests come to the index file. Routing is handled by Express,
which then creates the Controller and all its dependencies.

The controller then calls a service, which looks at the request and makes 
decisions on whether to process an update, delete, insert, or select on the 
database.

*NOTE: All methods return a Promise*

## FLOW
When the server starts up, we create a new instances of classes from the `routes`
directory.

### Routes

So, take for instance, the `UserRouter`. The `UserRoutes` is class which contains 
methods that correspond to the HTTP method. The `UserRoutes` class imports a module
`ioc/Container.js`. The *Container* class's purpose is create other classes, 
especially our controller, and return it.

Each of the properties of the `Container` class is a functions whose express 
purpose is to create a controller, and its parameters (which are services).
Since each of the services takes one or more classes as a parameter, the 
function also creates the models that are passed into the services.

Here's the code, we'll go over it step by step

    createUserController: function()
    {
      // create our user controller, inject its dependencies into it
      let userModel      = new UserModel();
      let timeService    = new TimeService();
      let authService    = new AuthService(userModel);
      let userService    = new UserService(userModel, timeService);
      return new UserController(authService, userService);
    },

The *Dependency Injector* class function `createUserController` first creates a `UserModel`
and a `TimeService`

    let userModel      = new UserModel();
    let timeService    = new TimeService();

We then create an `AuthService` object. The `AuthService` class takes in a
`UserModel` as an input. So, we pass in the instance we just instantiated to our
`AuthService` controller.

    let authService    = new AuthService(userModel);
    let userService    = new UserService(userModel, timeService);

*The reason we are doing things this way is to instantiating only 1 instance
of any class. We want each HTTP request to have its own classes to operate. This
makes our code able to handle multiple requests, and scale better*

The last line is to create the controller

    return new UserController(authService, userService);

### Controller

Following the `userRoute` let's look at the `controller/UserController` class

The `UserController` class contains methods that correspond to the HTTP verb
that comes in. 

Controller methods don't *have* match the HTTP verb. It's something I think makes
debugging easier, but is not required. Because the controller method names
match the `Express Router` method names.

Just make sure that the Express Router's method matches the name of the 
controller.

Each method of the controller returns a Promise. So, our `UserController` returns
a promise

    return this.authService.decodeJwt(request.headers)

If you notice, our Controller first calls the `AuthService`, then calls the
`UserService`

    return this.authService.decodeJwt(request.headers)
    .then(decodedJwt => {

        // this is an Object that contains email and user_id
        let userInfo = {...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email
        };

        return this.userService.handleGet(userId, userInfo);
      })

This is because we make our controllers dumb. The controller simply calls a
method which returns a Promise. If the Promises resolves, we then call our 
other service, if the promise is rejected, we resolve the Promise to our 
`UserRoutes`    

### Services

The `Services` are where the logic of the application lives. Again, services
return Promises.

Services call other services and models. If we look at our `UserService` class
we see that our methods return Promises, but, these promises are from the model
class.

There are 2 seperate Models in this example: One is if you want to use connection
pools (**YOU DO**) the other is if you don't (**this won't scale**)

On the successful resolution of the Promise, you can do other things: like 
call another method on a different model, call another method on the same model,
call another service. 

The point is, *Services are where you application logic lives*

#### Methods on each class do 1 thing
#### Methods on a service class call those methods.
#### Services are "smart". Everything else is dumb

### Models

Each method on a model builds a query, and returns a promise

    return this.runQuery(query, [values])

