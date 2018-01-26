let pool     = require('../configs/pools').pool;
const uuidv4 = require('uuid/v4');

/**
 * Represents a product
 * @constructor
 */
function Product()
{
  /**
   * Selects a product by ID
   * @param {string} productId
   * @return {Promise} records found
   */
  this.getProductById = function(productId)
  {
    let sql = 'SELECT product_id, title, price, quantity FROM products';

    if (productId !== '') {
      sql += ' WHERE product_id = ?';
    }

    return this.runQuery(sql, [productId])
    .then(results =>
    {
      if (results.resultSet.length === 0) {
        return {
          success: false,
          message: 'No Products Found',
          results: [],
        };
      }

      if (productId === '') {
        return {
          success: true,
          message: 'success',
          results: results.resultSet,
        };
      }

      return {
        success: true,
        message: 'success',
        results: resultSet,
      };
    })
    .catch(error =>
    {
      console.log('EXCEPTION OCCURRED SELECTING: ', error);
      return {
        success: false,
        message: 'Error Occurred Finding User',
      };
    })
  };

  /**
   * Creates a new product
   * @param {Object} body
   * @return {Promise}
   */
  this.addNewProduct = function(body)
  {
    let sql = 'INSERT INTO products (';
    let val = ') VALUES (';
    let end = ')';

    body.product_id = uuidv4();

    let insert = [];
    let values = [];
    let holders = [];

    for(let prop in body) {
      if (body.hasOwnProperty(prop)) {
        // avoid getting anything from prototype
        insert.push(prop);
        holders.push('?');
        values.push(body[prop]);
      }
    }

    sql += insert.join(',') + val + holders.join(',') + end;

    return this.isUuidUnique(body.product_id)
      .then((uniqueResults) =>
      {
        let found = uniqueResults.resultSet[0].found;

        if (found) {
          throw 'NON-UNIQUE UUID';
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
        message: 'Error Adding New Product',
      };
    });
  }

  /**
   * Updates a product
   * @param {string} productId
   * @param {Object} body
   * @return {Promise}
   */
  this.updateProduct = function(productId, body)
  {
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
        message: updated ? 'Success' : 'No Product Found',
      };
    })
    .catch(error => {
      console.log('EXCEPTION OCCURRED UPDATING ', error);

      return {
        success: false,
        message: 'Error Occurred Updating',
      };
    });
  }

  /**
   *
   * @param {string} productId
   * @return {Promise}
   */
  this.deleteProduct = function(productId)
  {
    let sql = 'DELETE FROM products WHERE product_id = ?';
    let values = [productId];

    return this.runQuery(sql, values)
    .then(resultSet => {
      console.log();

      let updated = resultSet.result.affectedRows === 1;
      return {
        success: updated,
        message: updated ? 'Success' : 'No Product Found',
      }
    })
    .catch(error => {
      console.log('EXCEPTION DELETING: ', error);

      return {
        success: false,
        message: 'Error Occurred Removing Product',
      }
    })
  }

  /**
   *
   * @param {string} query
   * @param {array} params
   * @return {Promise}
   */
  this.runQuery = function(query, params)
  {
    return new Promise((resolve, reject) =>
    {
      pool.getConnection(function(err, connection)
      {
        if (err) {
          console.log('EXCEPTION CONNECTING TO DATABASE');
          return reject('failed to establish connection');
        }

        connection.query(query, params, function (error, results, fields)
        {
          connection.release();

          if (error) {
            console.log('EXCEPTION RUNNING QUERY:', error);
            return reject('error with query');
          }

          // console.log('success running query [fields]', fields);
          // console.log('success running query [results]', results);
          resolve({resultSet: results, fieldSet: fields});
        });
      });
    })
  };

  /**
   * Looks to see if the UUID is unique or not. Resolves to 0 or 1
   * @param {string} uuid
   * @return {Promise}
   */
  this.isUuidUnique = function(uuid)
  {
    let sql  = 'SELECT COUNT(*) AS found FROM products WHERE product_id = ?';
    return this.runQuery(sql, [uuid]);
  }

}

module.exports = Product;
