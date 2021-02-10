const query  = require('./_Query');

function Cart() {
  this.getCart = function(userId) {
    let sql = `SELECT c.product_id, p.title, p.price
FROM user_cart AS c
INNER JOIN products p on c.product_id = p.product_id
WHERE c.user_id = :user_id`;

    return query(sql, {user_id: userId, })
      .then(results => results.resultSet);
  };

  this.clearCart = function(userId) {
    let sql = 'DELETE FROM user_cart WHERE user_id = :user_id';

    return query(sql, {user_id: userId, });
  };

  this.addItem = function(userId, productId) {
    let sql = `
INSERT INTO user_cart (user_id, product_id)
VALUES (:user_id, :product_id)`;

    return query(sql, { user_id: userId, product_id: productId, });
  };

  this.deleteItem = function(userId, productId) {
    let sql = `
DELETE FROM user_cart WHERE user_id = :user_id AND product_id = :product_id`;

    return query(sql, { user_id: userId, product_id: productId, });
  };
}

module.exports = Cart;
