# An Express application that uses promises instead of callbacks

In trying to better understand Promises (and for an upcoming talk where I compare
PHP and Node based APIs) I've created this project as a learning tool for anyone
to better understand Node promises.

The premise is simple

    HTTP Request -> index -> route -> controller -> service -> model

So, all HTTP requests come to the index file. Routing is handled by Express,
which then creates the Controller and all its dependencies.

The controller then calls a service, which looks at the request and makes decisions
on whether to process an update, delete, insert, or select on the database.

## FLOW
When the server starts up, we create a new instances of classes from the `routes`
directory.

So, take for instance, the `UserRouter`. The `UserRoutes` module imports a module
which contains functions whose express purpose is to create a controller, its
parameters (which are services) and the parameters to its dependencies (which
are models).

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

The `DependencyInjector` function `createUserController` first creates a `UserModel`
and a `TimeService`

    let userModel      = new UserModel();
    let timeService    = new TimeService();

We then create an `AuthService` object. The `AuthService` class takes in a
`UserModel` as an input. So, we pass in the instance we just instantiated to our
`AuthService` controller.

*The reason we are doing things this way is to prevent instantiating only 1 instance
of any class. We want each HTTP request to have its own classes to operate. This
makes our code able to handle multiple requests, and scale better*
