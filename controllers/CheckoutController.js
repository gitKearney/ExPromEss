function CheckoutController(checkoutService) {
  this.post = function(body) {
    let userId = '';
    if (Object.prototype.hasOwnProperty.call(body, 'user_id')) {
      userId = body['user_id'];
    }

    if (userId.length === 0) {
      throw new Error('Invalid User');
    }

    return checkoutService.checkout(userId);
  };
}

module.exports = CheckoutController;
