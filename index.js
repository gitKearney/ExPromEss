let express = require('express');

// create an instance of express router
let app = express();

/**
 * send the following headers on every call to the server.
 * This allows CORS (Cross-Origin Resource Sharing) support
 * see: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader(
            'Access-Control-Allow-Method',
            'GET, POST, PUT, PATCH, DELETE, OPTION');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Authorization');

    response.type('json');

    // go to the next middleware route
    next();
});

let UserRouter = require('./routes/userRoutes');
let userRouter = new UserRouter(express);
app.use('/users', userRouter);

let AuthRouter = require('./routes/authRoutes');
let authRouter = new AuthRouter(express);
app.use('/auth', authRouter);

let ProductRouter = require('./routes/productRoutes');
let productRouter = new ProductRouter(express);
app.use('/product', productRouter);

let ProductsRouter = require('./routes/productsRoutes');
let productsRouter = new ProductsRouter(express);
app.use('/products', productsRouter);

app.listen(3123);
