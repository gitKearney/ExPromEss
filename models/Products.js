const uuidv4 = require('uuid/v4');
const query  = require('./_Query');

function Products() {
  this.getProductsByPage = function(page) {
    // this query returns 3 products per page
    let limit = (page - 1) * 3;
    let sql = 'SELECT product_id, title, price, quantity FROM products LIMIT :limit, 3';

    return query(sql, { limit, });
  };

  this.getProductById = function(productId) {
    let sql = `
SELECT product_id, title, price, quantity
FROM products WHERE product_id = :product_id`;

    return query(sql, { product_id: productId, } )
      .then(results => {
        if (results.resultSet.length === 0) {
          return [];
        }

        return results.resultSet[0];
      });
  };


  this.addNewProduct = function(values) {
    const sql = `
INSERT INTO products (product_id, title, price, quantity)
VALUES(:product_id, :title, :price, :quantity)`;

    // check to see if the UUID already exists
    let productId = null;
    return this.getUuids()
      .then(results => {
        let ids = results.resultSet;

        let index = -1;
        do {
          productId = uuidv4();
          index = ids.findIndex(element => element.product_id === productId);
        } while(index !== -1);

        values['product_id'] = productId;
        return query(sql, values);
      })
      .then(qrs => {
        console.log('insert response', qrs);
        return productId;
      });
  };

  this.updateProduct = function(productId, body) {
    let update = [];
    let values = {};

    if (Object.prototype.hasOwnProperty.call(body, 'title')) {
      update.push('title = :title');
      values['title'] = body['title'];
    }

    if (Object.prototype.hasOwnProperty.call(body, 'price')) {
      update.push('price = :price');
      values['price'] = body.price;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'quantity')) {
      update.push('quantity = :quantity');
      values['quantity'] = body.quantity;
    }

    let sets = update.join(',');
    let sql = `UPDATE products SET ${sets} WHERE product_id = :product_id`;
    values['product_id'] = productId;

    return query(sql, values)
      .then(results => {
        return results.resultSet.affectedRows === 1;
      });
  };

  this.deleteProduct = function(productId) {
    let sql = 'DELETE FROM products WHERE product_id = :product_id';
    let values = { product_id: productId, };

    return query(sql, values)
      .then(result => result.resultSet.affectedRows === 1);
  };

  this.getUuids = function() {
    let sql  = 'SELECT product_id FROM products';
    return query(sql, { });
  };
}

module.exports = Products;
