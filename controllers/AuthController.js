function AuthController(authService) {
  this.post = function(request) {
    const TEST_MODE = false;

    if (TEST_MODE) {
      return authService.testCreateToken();
    }
    return authService.createToken(request.body);
  };
}

module.exports = AuthController;
