function CartController(authService, cartService) {

  /**
   * returns all items from a user's cart
   * @param {string} userId
   * @return {Promise<[]>}
   */
  this.get = function(userId) {
    return cartService.getCart(userId);
  };

  /**
   * deletes all items from the cart
   * @param {string} userId
   * @return {Promise<boolean>}
   */
  this.delete = function(userId) {
    return cartService.clearCart(userId);
  };

  /**
   * removes a single item from the cart
   * @param {string} userId
   * @param {Object} body
   * @return {Promise<boolean>}
   */
  this.patch = function(userId, body) {
    if(!Object.prototype.hasOwnProperty.call(body, 'product_id')) {
      throw new Error('invalid product');
    }

    let productId = body['product_id'];
    return cartService.removeItem(userId, productId);
  };

  /**
   * Adds an item to the cart
   * @param {Object} body
   * @return {Promise<boolean>}
   */
  this.put = function(body) {
    if(!Object.prototype.hasOwnProperty.call(body, 'user_id')) {
      throw new Error('invalid user');
    }
    if(!Object.prototype.hasOwnProperty.call(body, 'product_id')) {
      throw new Error('invalid product');
    }

    let userId = body['user_id'];
    let productId = body['product_id'];
    return cartService.addItem(userId, productId);
  };
}

module.exports = CartController;
