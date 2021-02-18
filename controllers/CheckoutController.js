function CheckoutController(authService, checkoutService, userService) {
  const requires = 'read';
  this.post = function(body, bearer) {
    let userId = '';
    if (Object.prototype.hasOwnProperty.call(body, 'user_id')) {
      userId = body['user_id'];
    }

    if (userId.length === 0) {
      throw new Error('Invalid User');
    }

    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then((rs) => checkoutService.checkout(userId, rs));
  };
}

module.exports = CheckoutController;
