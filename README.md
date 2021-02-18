# An Express application that uses promises instead of callbacks
This is a simple project to help me better understand promises and how use
NodeJS with MySQL

The premise is simple

    HTTP Request -> index -> route -> controller -> service -> model

So, all HTTP requests come to the index file. Routing is handled by Express,
which then creates the Controller and all its dependencies.

The controller then calls a service, which looks at the request and makes
decisions on whether to process an update, delete, insert, or select on the
database.

## ESLINT TO FIX FILES
I've decided to use ESLint to help each file feel and look more consistent.
There is a file: *.eslintrc.json* that contains all the rules


When you create a new file (or edit an existing file), be sure to run the 
following command. ESLint will automatically analyze the code and fix
it to adhere to the standards

    node_modules/eslint/bin/eslint.js --fix dir/file.js


### Services
*Services are where you application logic lives*

#### Methods on each class do 1 thing
#### Methods on a service class call those methods.
#### Services are "smart". Everything else is dumb
#### Scripts to help with Development
I program on a Mac, but use Ubuntu for the MariaDB server

In order to connect to the VM these are the steps

 * (from vm) `ssh -R 2202:localhost:22 kearney@mac_ip_address`
 * (from mac) `ssh -p 2202 kearney@localhost`
 * (from vm) `ssh -R 3366:localhost:3306 kearney@mac_ip_address`
 * (on vm) `ssh-keygen -t rsa` then copy the *id_rsa.pub* file to the mac under *.ssh/authorized_keys* and take 
   the id_rsa.pub from mac and put on vm in `.ssh/authorized_keys`