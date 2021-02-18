function CartController(authService, cartService, userService) {

  /**
   * returns all items from a user's cart
   * @param {string} userId
   * @return {Promise<[]>}
   */
  this.get = function(userId, bearer) {
    const requires = 'read';
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => cartService.getCart(userId));
  };

  /**
   * deletes all items from the cart
   * @param {string} userId
   * @return {Promise<boolean>}
   */
  this.delete = function(userId, bearer) {
    const requires = 'read';
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => cartService.clearCart(userId));
  };

  /**
   * removes a single item from the cart
   * @param {string} userId
   * @param {Object} body
   * @param {string} bearer
   * @return {Promise<boolean>}
   */
  this.patch = function(userId, body, bearer) {
    const requires = 'read';

    if(!Object.prototype.hasOwnProperty.call(body, 'product_id')) {
      throw new Error('invalid product');
    }

    let productId = body['product_id'];
    return authService.decode(bearer)
    .then((user) => userService.userHasPermission(user.data['user_id'], requires))
    .then(() => cartService.removeItem(userId, productId));
  };

  /**
   * Adds an item to the cart
   * @param {Object} body
   * @param {string} bearer
   * @return {Promise<boolean>}
   */
  this.put = function(body, bearer) {
    const requires = 'read';

    if(!Object.prototype.hasOwnProperty.call(body, 'user_id')) {
      throw new Error('invalid user');
    }
    if(!Object.prototype.hasOwnProperty.call(body, 'product_id')) {
      throw new Error('invalid product');
    }

    let userId = body['user_id'];
    let productId = body['product_id'];

    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => cartService.addItem(userId, productId));
  };
}

module.exports = CartController;
