/**
 * Verifies POST password and returns an error or JWT
 * @param {authService} authService
 */
function AuthController(authService) {
  this.post = function(request) {
    return authService.authenticate(request.body)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('authController.caught error', error);
        return error;
      });
  };
}

module.exports = AuthController;
