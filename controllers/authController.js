/**
 *
 * @param {AuthService} authService
 */
function AuthController(authService)
{
  this.post = function(request)
  {
    return authService.authenticate(request.body)
    .then(result => {
      console.log('auth service returned: ', result);
      return result;
    })
    .catch(error => {
      console.log('auth service rejected: ', error);
      return error;
    });
  }
}

module.exports = AuthController;
