/** * IMPORT MODELS ***/
let Users        = require('../models/Users');
let Products     = require('../models/Products');
let Transactions = require('../models/Transactions');
let Cart         = require('../models/Cart');

/** * IMPORT SERVICES ***/
let AuthService    = require('../services/AuthService');
let TimeService    = require('../services/TimeService');
let UserService    = require('../services/UserService');
let ProductService = require('../services/ProductService');
let CartService    = require('../services/CartService');
let TransactionService = require('../services/TransactionService');
let CheckoutService    = require('../services/CheckoutService');

/** * IMPORT CONTROLLERS ***/
let AuthController     = require('../controllers/AuthController');
let UserController     = require('../controllers/UserController');
let ProductController  = require('../controllers/ProductController');
let ProductsController = require('../controllers/ProductsController');
let TransactionController = require('../controllers/TransactionController');
let CartController     = require('../controllers/CartController');
let CheckoutController = require('../controllers/CheckoutController');

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

  /** @return {Transactions} */
  transactionModel: function() {
    return new Transactions();
  },

  /** @return {Cart} */
  cartModel: function() {
    return new Cart();
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

  /** @return {TransactionService} */
  transactionService: function() {
    let transactions = this.transactionModel();
    return new TransactionService(transactions);
  },

  /** @return {CartService} */
  cartService: function() {
    let cart = this.cartModel();
    return new CartService(cart);
  },

  /** @return {CheckoutService} */
  checkoutService: function() {
    let cart = this.cartModel();
    let trans = this.transactionModel();
    return new CheckoutService(trans, cart);
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

  /** @return {TransactionController} */
  transactionController: function() {
    let authService = this.authService();
    let userService = this.userService();
    let transactionService = this.transactionService();
    return new TransactionController(authService, userService, transactionService);
  },

  /** @return {CartController} */
  cartController: function() {
    let authService = this.authService();
    let cartService = this.cartService();
    let userService = this.userService();

    return new CartController(authService, cartService, userService);
  },

  /** @return {CheckoutController} */
  checkoutController: function() {
    let checkoutService = this.checkoutService();
    let authService = this.authService();
    let userService = this.userService();

    return new CheckoutController(authService, checkoutService, userService);
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

  /** @return {TransactionController} */
  createTransactionController: function() {
    return container.transactionController();
  },

  /** @return {CartController} */
  createCartController: function() {
    return container.cartController();
  },

  createCheckoutController: function() {
    return container.checkoutController();
  },
};
