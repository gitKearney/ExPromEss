const pool = require('./_Connection');

function query(sql, params) {

  const executor = (resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject('failed to establish connection');
      }

      connection.config.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }
          return txt;
        }.bind(this));
      };
      
      connection.query(sql, params, (error, results, fields) => {
        connection.release();

        if (error) {
          console.log('error running query:', error);
          reject('error with query');
          return;
        }

        resolve({ resultSet: results, fieldSet: fields, });
      });
    });
  };

  return new Promise(executor);
};

module.exports = query;
