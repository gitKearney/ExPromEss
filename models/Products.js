const uuidv4 = require('uuid/v4');
const query  = require('./_Query');

function Products() {
  this.getProductsByPage = function(page) {
    // this query returns 3 products per page
    let limit = page * 3;
    let sql = 'SELECT product_id, title, price, quantity FROM products LIMIT :limit, 3';

    return query(sql, { limit, })
      .then(results => {
        if (results.resultSet.length === 0) {
          return [];
        }

        return results.resultSet;
      });
  };

  /**
   * Selects a product by ID
   * @param {string} productId
   * @return {Promise} records found
   */
  this.getProductById = function(productId) {
    let sql = 'SELECT product_id, title, price, quantity FROM products';

    if (productId !== '') {
      sql += ' WHERE product_id = ?';
    }

    return this.runQuery(sql, [ productId, ])
      .then(results => {
        if (results.resultSet.length === 0) {
          return {
            success: false,
            message: 'No Products Found',
            results: [],
          };
        }

        let rs = [];
        results.resultSet.forEach((element) => {
          let record = { ...element, };
          rs.push(record);
        });

        return {
          success: true,
          message: 'success',
          results: rs,
        };
      })
      .catch(error => {
        console.log('EXCEPTION OCCURRED SELECTING: ', error);
        return {
          success: false,
          message: 'Error Occurred Finding Products',
        };
      });
  };

  /**
   * Creates a new product
   * @param {Object} body
   * @return {Promise}
   */
  this.addNewProduct = function(body) {
    let sql = 'INSERT INTO products (';
    let val = ') VALUES (';
    let end = ')';

    body.product_id = uuidv4();

    let insert = [];
    let values = [];
    let holders = [];

    for (let prop in body) {
      // get only actual properties and not constructor properties
      if (body.hasOwnProperty(prop)) {
        // check to make sure the property is valid
        if (columnNames.indexOf(prop) !== -1) {
          insert.push(prop);
          holders.push('?');
          values.push(body[prop]);
        }
      }
    }

    if (holders.length === 0 || holders.length !== columnNames.length) {
      throw new Error('Invalid Params');
    }

    sql += insert.join(',') + val + holders.join(',') + end;

    return this.isUuidUnique(body.product_id)
      .then((uniqueResults) => {
        let found = uniqueResults.resultSet[0].found;

        if (found) {
          throw new Error('NON-UNIQUE UUID');
        }

        return this.runQuery(sql, values);
      })
      .then((insertResults) => {
        return {
          results: body.product_id,
          success: true,
          message: 'success',
        };
      })
      .catch((error) => {
        console.log('EXCEPTION ADDING PRODUCT - ', error);

        return {
          results: '',
          success: false,
          message: 'Error Adding New Products',
        };
      });
  };

  /**
   * Updates a product
   * @param {string} productId
   * @param {Object} body
   * @return {Promise}
   */
  this.updateProduct = function(productId, body) {
    let sql = 'UPDATE products SET ';
    let where = ' WHERE product_id = ?';

    let update = [];
    let values = [];

    if (body.hasOwnProperty('title')) {
      update.push('title = ?,');
      values.push(body.title);
    }

    if (body.hasOwnProperty('price')) {
      update.push('price = ?,');
      values.push(body.price);
    }

    if (body.hasOwnProperty('quantity')) {
      update.push('quantity = ?,');
      values.push(body.quantity);
    }

    update.push('updated_at = ?');
    values.push(body.updated_at);

    sql += update.join('') + where;
    values.push(productId);

    return this.runQuery(sql, values)
      .then(results => {
        let updated = results.resultSet.affectedRows === 1;

        return {
          success: updated,
          message: updated ? 'Success' : 'No Products Found',
        };
      })
      .catch(error => {
        console.log('EXCEPTION OCCURRED UPDATING ', error);

        return {
          success: false,
          message: 'Error Occurred Updating',
        };
      });
  };

  /**
   *
   * @param {string} productId
   * @return {Promise}
   */
  this.deleteProduct = function(productId) {
    let sql = 'DELETE FROM products WHERE product_id = ?';
    let values = [ productId, ];

    return this.runQuery(sql, values)
      .then(result => {
        let updated = result.resultSet.affectedRows === 1;

        return {
          success: updated,
          message: updated ? 'Success' : 'No Products Found',
        };
      })
      .catch(error => {
        console.log('EXCEPTION DELETING: ', error);

        return {
          success: false,
          message: 'Error Occurred Removing Products',
        };
      });
  };

  /**
   * Looks to see if the UUID is unique or not. Resolves to 0 or 1
   * @param {string} uuid
   * @return {Promise}
   */
  this.isUuidUnique = function(uuid) {
    let sql  = 'SELECT COUNT(*) AS found FROM products WHERE product_id = ?';
    return this.runQuery(sql, [ uuid, ]);
  };
}

module.exports = Products;
