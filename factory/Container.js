/** * IMPORT MODELS ***/
let Users      = require('../models/Users');
let Products   = require('../models/Products');

/** * IMPORT SERVICES ***/
let AuthService    = require('../services/authService');
let TimeService    = require('../services/timeService');
let UserService    = require('../services/userService');
let ProductService = require('../services/productService');

/** * IMPORT CONTROLLERS ***/
let AuthController     = require('../controllers/AuthController');
let UserController     = require('../controllers/UserController');
let ProductController  = require('../controllers/ProductController');
const ProductsController = require('../controllers/ProductsController');

const container = {
  // *** MODELS ***

  /**
   * @returns {Products}
   */
  productModel: function() {
    return new Products();
  },

  /**
   * @returns {Users}
   */
  userModel: function() {
    return new Users();
  },

  // *** SERVICES ***

  /**
   * @returns {AuthService}
   */
  authService: function() {
    let userModel = this.userModel();
    return new AuthService(userModel);
  },

  /** @return {TimeService} */
  timeService: function() {
    return new TimeService();
  },

  /** @return {ProductService} */
  productService: function() {
    let productModel = this.productModel();
    let timeService = this.timeService();
    return new ProductService(productModel, timeService);
  },

  /** @return {UserService} */
  userService: function() {
    let user = this.userModel();
    let timeService = this.timeService();
    return new UserService(user, timeService);
  },

  // *** CONTROLLERS ***

  /**
   * @return {UserController}
   */
  userController: function() {
    let authService = this.authService();
    let userService = this.userService();
    return new UserController(authService, userService);
  },

  /**
   * @return {AuthController}
   */
  authController: function() {
    let authService = this.authService();
    return new AuthController(authService);
  },

  /**
   * @return {ProductController}
   */
  productController: function() {
    let authService = this.authService();
    let productService = this.productService();
    let userService = this.userService();
    return new ProductController(authService, productService, userService);
  },

  /**
   * @return {ProductsController}
   */
  productsController: function() {
    let authService = this.authService();
    let productService = this.productService();
    let userService = this.userService();

    return new ProductsController(authService, productService, userService);
  },
};

module.exports = {
  /**
   * @return {UserController}
   */
  createUserController: function() {
    return container.userController();
  },

  /**
   * @return {AuthController}
   */
  createAuthController: function() {
    return container.authController();
  },

  /**
   * @return {ProductController}
   */
  createProductController: function() {
    return container.productController();
  },

  /**
   * @return {ProductsController}
   */
  createProductsContainer: function() {
    return container.productsController();
  },
};
