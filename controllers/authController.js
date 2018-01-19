/**
 *
 * @param {AuthService} authService
 */
function AuthController(authService)
{
  this.post = function(request)
  {
    return authService.authenticate(request.body);
  }
}

module.exports = AuthController;
