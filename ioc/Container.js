/*** IMPORT MODELS ***/

// if you are only using user
// let UserModel      = require('../models/user');
let UserModel      = require('../models/pool_user');
let ProductModel   = require('../models/product');

/*** IMPORT SERVICES ***/
let AuthService    = require('../services/authService');
let TimeService    = require('../services/timeService');
let UserService    = require('../services/userService');
let ProductService = require('../services/productService');

/*** IMPORT CONTROLLERS ***/
let AuthController    = require('../controllers/authController');
let UserController    = require('../controllers/userController');
let ProductController = require('../controllers/productController');
let ProductsController = require('../controllers/productsController');

module.exports = {
  createUserController: function()
  {
    // create our user controller, inject its dependencies into it
    let userModel      = new UserModel();
    let timeService    = new TimeService();
    let authService    = new AuthService(userModel);
    let userService    = new UserService(userModel, timeService);
    return new UserController(authService, userService);
  },

  createAuthController: function()
  {
    // create our user model, inject its dependencies into it
    let userModel   = new UserModel();
    let authService = new AuthService(userModel);
    return new AuthController(authService);
  },

  createProductController: function()
  {
    let userModel    = new UserModel();
    let productModel = new ProductModel();
    let authService  = new AuthService(userModel);
    let timeService    = new TimeService();
    let productService = new ProductService(productModel, timeService);
    let productController = new ProductController(authService, productService);

    return productController;
  },

  createProductsController: function()
  {
    let userModel    = new UserModel();
    let productModel = new ProductModel();
    let authService  = new AuthService(userModel);
    let timeService    = new TimeService();
    let productService = new ProductService(productModel, timeService);
    let productsController = new ProductsController(authService, productService);

    return productsController;
  },
}