function CartService(cart) {
  this.getCart = function(userId) {
    return cart.getCart(userId);
  };

  this.addItem = function(userId, productId) {
    return cart.addItem(userId, productId)
      .then(results => {
        return results.resultSet.affectedRows === 1;
      });
  };

  this.removeItem = function(userId, productId) {
    return cart.deleteItem(userId, productId)
      .then(result => result.resultSet.affectedRows > 0);
  };

  this.clearCart = function(userId) {
    return cart.clearCart(userId);
  };

}

module.exports = CartService;
