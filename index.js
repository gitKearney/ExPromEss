const express = require('express');
const printDate = require('./utils/printDate');

// create an instance of express router
let app = express();

/**
 * @description middleware to send the following headers on every request.
 * This allows CORS (Cross-Origin Resource Sharing) support
 * see: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
function allowCors(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  response.type('json');

  next();
}

function logRequest(request, response, next) {
  let ctime = printDate();
  let url = request.originalUrl;
  let method = request.method;
  console.log(`[${ctime}] ${method}: ${url}`);

  next();
}

// SETUP MIDDLEWARE
app.use(
  [allowCors, logRequest],
  express.json({ inflate: true }),
  express.urlencoded({ extended: true, inflate: true })
);

let createUserRouter = require('./routes/userRoutes');
let userRouter = new createUserRouter(express);
app.use('/users', userRouter);

let createAuthRouter = require('./routes/authRoutes');
let authRouter = new createAuthRouter(express);
app.use('/auth', authRouter);

// This route performs operations on products, but does not return all products
let createProductRouter = require('./routes/productRoutes');
let productRouter = new createProductRouter(express);
app.use('/product', productRouter);

// this route gets all products. If the user wants only 1 product then they
// need to call `product/{id}`
let createProductsRouter = require('./routes/productsRoutes');
let productsRouter = new createProductsRouter(express);
app.use('/products', productsRouter);

const PORT = process.argv[2] || 3123;

app.listen(PORT, () => console.log(`server started http://localhost:${PORT}`));
