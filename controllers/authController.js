const AuthService = require("../services/authService");

/**
 * Verifies POST password and returns an error or JWT
 * @param {AuthService} authService
 */
function AuthController(authService) {
  this.post = function(request) {
    return authService.authenticate(request.body);
  };
}

module.exports = AuthController;
