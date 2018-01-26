let bcrypt   = require('bcrypt-nodejs');
let pool     = require('../configs/pools').pool;
const uuidv4 = require('uuid/v4');

/**
 * This constructor function is responsible for running queries against
 * the mysql database
 */
function Users()
{
  /**
   *
   * @param {string} userId
   * @return {Promise}
   */
  this.deleteUser = function(userId)
  {
    let query = 'DELETE FROM users WHERE user_id = ?';
    return this.runQuery(query, [userId])
      .then(results => {
        let success = results.resultSet.affectedRows === 1;

        return {
          success: success,
          message: success ? 'success' : 'failure',
        };
      })
      .catch(error => {
        console.log('EXCEPTION DELETING USER: ', error);

        return {
          success: false,
          message: 'Error Deleting User',
        };
      });
  };

  this.getUser = function(sql, params)
  {
    return this.runQuery(sql, params)
      .then((results) =>
      {
        if (results.resultSet.length === 0) {
          return {
            message: 'No User Found',
            success: false,
            results: [],
          };
        }

        let rs = [];
        results.resultSet.forEach((element) => {
          let record = {...element};
          rs.push(record);
        });

        // return our result to the calling method
        return {
          success: true,
          message: 'success',
          results: rs,
        };
      })
      .catch(error =>
      {
        return {
          success: false,
          message: 'error',
        };
      });
  };

  /**
   *
   * @param {string} email
   * @return {Promise}
   */
  this.getUserByEmail = function(email)
  {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, '
    + 'birthday, roles FROM users WHERE email = ?';

    return this.getUser(sql, [email]);
  };

  this.getUserById = function(id)
  {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, '
    + 'birthday, roles FROM users';

    if (id !== '') {
      sql += ' WHERE user_id = ?';
    }

    return this.getUser(sql, [id]);
  };

  /**
   * Inserts a user into the database
   */
  this.addUser = function(postParams)
  {
    let parent = this;

    let insertValues = [
      uuidv4(),
      postParams.first_name,
      postParams.last_name,
      bcrypt.hashSync(postParams.password),
      postParams.email,
      postParams.birthday,
      postParams.currentTime,
    ];

    // use promises to handle all callbacks.
    return parent.isEmailUnique(postParams.email)
      .then((emailResults) =>
      {
        let found = emailResults.resultSet[0].found;
        if (found) {
          return {
            message: 'user already registered',
            success: false,
          };
        }

        return parent.isUuidUnique(insertValues[0]);
      })
      .then(uuidResults =>
      {
        let found = uuidResults.resultSet[0].found;
        if (found) {
          return {
            message: 'Error Assigning ID',
            success: false,
          };
        }

        // create our insert query & insert array
        let sql = 'INSERT INTO USERS (user_id, first_name, last_name, '
        + 'upassword, email, birthday, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';

        return parent.runQuery(sql, insertValues);
      })
      .then(results =>
      {
        // return an object to our calling method:
        return {
          success: true,
          reports: insertValues[0]
        };
      })
      .catch(error =>
      {
        console.log('EXCEPTION OCCURRED - ADDING USER', error);

        return {
          success: false,
          reports: 'Error Occurred Adding User'
        };
      })
  };

  /**
   *
   * @param {string} userId
   * @param {array} body
   * @return {Promise}
   */
  this.updateUser = function(userId, body)
  {
    let sql = 'UPDATE users SET ';
    let where = ' WHERE user_id = ?';

    let update = [];
    let values = [];

    if (body.hasOwnProperty('first_name')) {
      update.push('first_name = ?,');
      values.push(body.first_name);
    }

    if (body.hasOwnProperty('last_name')) {
      update.push('last_name = ?,');
      values.push(body.last_name);
    }

    if (body.hasOwnProperty('email')) {
      update.push('email = ?,');
      values.push(body.email);
    }

    if (body.hasOwnProperty('birthday')) {
      update.push('birthday = ?,');
      values.push(body.birthday);
    }

    if (body.hasOwnProperty('roles')) {
      update.push('roles = ?,');
      values.push(body.roles);
    }

    if (body.hasOwnProperty('upassword')) {
      let encryptedPassword = bcrypt.hashSync(body.password);

      update.push('upassword = ?,');
      values.push(encryptedPassword);
    }

    update.push('updated_at = ?');
    values.push(body.updated_at);

    sql += update.join('') + where;
    values.push(userId);

    return this.runQuery(sql, values)
      .then(results => {
        // console.log('updated x records:', results.resultSet.affectedRows);

        let success =  results.resultSet.affectedRows === 1;
        return {
          success: success,
          message: success ? 'success' : 'No User Found',
        };
      })
      .catch(error => {
        console.log('EXCEPTION UPDATING USER:', error);

        return {
          success: false,
          message: 'Error Occurred Updating User',
        };

      });
  };

  this.isEmailUnique = function(email)
  {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE email = ?';

    return this.runQuery(sql, [email]);
  };

  this.isUuidUnique = function(uuid)
  {
    let sql  = 'SELECT COUNT(*) AS found FROM users WHERE user_id = ?';

    return this.runQuery(sql, [uuid]);
  };

  /**
   * use this method for running selects
   * @param {string} query - well formed query
   * @param {array} params
   * @return {Promise}
   */
  this.runQuery = function(query, params)
  {
    return new Promise(function(resolve, reject)
    {
      pool.getConnection(function(err, connection)
      {
        if (err) {
          return reject('failed to establish connection');
        }

        connection.query(query, params, function (error, results, fields)
        {
          connection.release();

          if (error) {
            console.log('error running query:', error);
            return reject('error with query');
          }

          // console.log('success running query [fields]', fields);
          // console.log('success running query [results]', results);
          resolve({resultSet: results, fieldSet: fields});
        });
      });
    });
  };
}

module.exports = Users;
