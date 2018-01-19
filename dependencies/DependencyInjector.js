/*** IMPORT MODELS ***/
let UserModel      = require('../models/user');

/*** IMPORT SERVICES ***/
let AuthService = require('../services/authService');
let TimeService = require('../services/timeService');
let UserService = require('../services/userService');

/*** IMPORT CONTROLLERS ***/
let AuthController = require('../controllers/authController');
let UserController = require('../controllers/userController');

module.exports = {
  createUserController: function()
  {
    // create our user controller, inject its dependencies into it
    let userModel      = new UserModel();
    let timeService    = new TimeService();
    let userService    = new UserService(userModel, timeService);
    return new UserController(userService);
  },

  createAuthController: function()
  {
    // create our user model, inject its dependencies into it
    let userModel   = new UserModel();
    let authService = new AuthService(userModel);
    return new AuthController(authService);
  }
}