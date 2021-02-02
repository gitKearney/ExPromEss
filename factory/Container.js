/** * IMPORT MODELS ***/
let UserModel      = require('../models/Users');
let ProductModel   = require('../models/product');

/** * IMPORT SERVICES ***/
let AuthService    = require('../services/authService');
let TimeService    = require('../services/timeService');
let UserService    = require('../services/userService');
let ProductService = require('../services/productService');

/** * IMPORT CONTROLLERS ***/
let AuthController     = require('../controllers/authController');
let UserController     = require('../controllers/userController');
let ProductController  = require('../controllers/productController');
const ProductsController = require('../controllers/productsController');

const container = {
  // *** MODELS ***

  /**
   * @returns {Product}
   */
  productModel: function() {
    return new ProductModel();
  },

  /**
   * @returns {Users}
   */
  userModel: function() {
    return new UserModel();
  },

  // *** SERVICES ***

  /**
   * @returns {AuthService}
   */
  authService: function() {
    let userModel = this.userModel();
    return new AuthService(userModel);
  },

  timeService: function() {
    return new TimeService();
  },

  productService: function() {
    let productModel = this.productModel();
    let timeService = this.timeService();
    return new ProductService(productModel, timeService);
  },

  userService: function() {
    let user = this.userModel();
    let timeService = this.timeService();
    return new UserService(user, timeService);
  },

  /** CONTROLLERS */
  userController: function() {
    let authService = this.authService();
    let userService = this.userService();
    return new UserController(authService, userService);
  },

  authController: function() {
    let authService = this.authService();
    return new AuthController(authService);
  },

  productController: function() {
    let authService = this.authService();
    let productService = this.productService();
    return new ProductController(authService, productService);
  },

  productsController: function() {
    let authService = this.authService();
    let productService = this.productService();
    return new ProductsController(authService, productService);
  },
};

module.exports = {
  createUserController: function() {
    // create our user controller, inject its dependencies into it
    return container.userController();
  },

  createAuthController: function() {
    return container.authController();
  },

  createProductController: function() {
    return container.productController();
  },

  createProductsContainer: function() {
    return container.productsController();
  },
};
