function AuthController(authService) {
  this.post = function(request) {
    return authService.testCreateToken(request.body);
  };
}

module.exports = AuthController;
