let pool = require('../configs/pools').pool;

function BaseModel() {
  /**
   *
   * @param {string} query
   * @param {array} params
   * @return {Promise}
   */
  this.runQuery = (query, params) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(new Error('failed to establish connection'));
        }

        connection.query(query, params, (error, results, fields) => {
          connection.release();

          if (error) {
            console.log('error running query:', error);
            return reject(new Error('error with query'));
          }

          // console.log('success running query [fields]', fields);
          // console.log('success running query [results]', results);
          resolve({ resultSet: results, fieldSet: fields, });
        });
      });
    });
  };
}

module.exports = BaseModel;
