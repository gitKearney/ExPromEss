const bcrypt = require('bcrypt-nodejs');
const query  = require('./_Query');
const uuidv4 = require('uuid/v4');

function Users() {
  this.deleteUser = function(userId) {
    let query = 'DELETE FROM users WHERE user_id = ?';
    return this.runQuery(query, [ userId, ])
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

  this.getUser = function(sql, params) {
    return query(sql, params)
      .then((results) => {
        if (results.resultSet.length === 0) {
          return {
            message: 'No User Found',
            success: false,
            results: [],
          };
        }

        return {
          success: true,
          message: 'success',
          results: results.resultSet,
        };
      })
      .catch(() => {
        return {
          success: false,
          message: 'Error Occurred Finding User',
          results: [],
        };
      });
  };

  /**
   *
   * @param {string} email
   * @return {Promise}
   */
  this.getUserByEmail = function(email) {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, ' +
    'birthday, roles as role FROM users WHERE email = ?';

    return this.getUser(sql, [ email, ]);
  };

  this.getUserById = function(id) {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, ' +
    'birthday, roles as role FROM users';

    if (id !== '') {
      sql += ' WHERE user_id = :user_id';
    }

    return this.getUser(sql, {user_id: id});
  };

  
  this.addUser = function(vals) {
    vals['upassword'] = bcrypt.hashSync(vals.upassword);

    return this.isEmailUnique(vals['email'])
      .then((emailResults) => {
        let found = emailResults.resultSet[0].found;

        if (found === 1) {
          // TODO: convert this to a custom error
          throw new Error('user already registered');
        }

        return this.isUuidUnique(vals['user_id']);
      })
      .then(uuidResults => {
        let found = uuidResults.resultSet[0].found;
        if (found) {
          throw new Error('Error Assigning ID');
        }

        let sql = `
INSERT INTO users (user_id, first_name, last_name, upassword, email, birthday, roles)
VALUES (:user_id, :first_name, :last_name, :upassword, :email, :birthday, :roles)`;

        return query(sql, vals);
      })
      .then(results => {
        // return an object to our calling method:
        return {
          success: true,
          results: [ vals['user_id'] ],
        };
      })
      .catch(error => {
        console.log('EXCEPTION OCCURRED - ADDING USER', error);
        throw error;
      });
  };

  /**
   *
   * @param {string} userId
   * @param {array} body
   * @return {Promise}
   */
  this.updateUser = function(userId, body) {
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

        let success = results.resultSet.affectedRows === 1;
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

  this.isEmailUnique = function(email) {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE email = :email';

    return query(sql, { email });
  };

  this.isUuidUnique = function(uuid) {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE user_id = :user_id';

    return query(sql, { user_id: uuid });
  };

  this.getColumnNames = function() {
    return columnNames;
  };
}

module.exports = Users;
