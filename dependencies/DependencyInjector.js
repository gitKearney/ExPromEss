let UserController = require('../controllers/userController');
let UserService    = require('../services/userService');
let UserModel      = require('../models/user');
let TimeService    = require('../services/timeService');

module.exports = {
  createController: function()
  {
    // create our user controller, inject its dependencies into it
    let userModel      = new UserModel();
    let timeService    = new TimeService();
    let userService    = new UserService(userModel, timeService);
    let userController = new UserController(userService);

    return userController;
  }
}