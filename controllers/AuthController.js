function AuthController(authService) {
  this.post = function(request) {
    return authService.createToken(request.body);
  };
}

module.exports = AuthController;
