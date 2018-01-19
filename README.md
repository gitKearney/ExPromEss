# ExPromEss - A promised based Express API

In trying to better understand Promises (and for an upcoming talk where I compare PHP and Node based APIs) I've created
this project as a learning tool for anyone to better understand Node promises.

The premise is simple

    HTTP Request -> index -> route -> controller -> service -> model

So, all HTTP requests come to the index file. Routing is handled by Express, which then creates the Controller
and all its dependencies.

The controller then calls a service, which looks at the request and makes decisions on whether to process an update, delete,
insert, or select on the database.
