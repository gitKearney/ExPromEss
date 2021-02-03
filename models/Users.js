const bcrypt = require('bcrypt-nodejs');
const query  = require('./_Query');

function Users() {
  this.deleteUser = function(userId) {
    let sql = 'DELETE FROM users WHERE user_id = :user_id';
    return query(sql, { userId, })
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

  /**
   *
   * @param {string} sql
   * @param {Object} params
   * @return {Promise<[]>}
   */
  this.getUser = function(sql, params) {
    return query(sql, params)
      .then((results) => {
        if (results.resultSet.length === 0) {
          throw new Error('Invalid User');
        }

        return results.resultSet[0];
      });
  };

  /**
   *
   * @param {string} email
   * @return {Promise<*[]>}
   */
  this.getUserByEmail = function(email) {
    let sql = `
SELECT user_id, first_name, last_name, upassword, email,
birthday, roles as role FROM users WHERE email = :email`;

    return this.getUser(sql, { email, });
  };

  /**
   *
   * @param {string} id
   * @return {Promise<*[]>}
   */
  this.getUserById = function(id) {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, ' +
    'birthday, roles as role FROM users';

    if (id !== '') {
      sql += ' WHERE user_id = :user_id';
    }

    return this.getUser(sql, { user_id: id, });
  };

  /**
   *
   * @param vals
   * @return {Promise<{success: boolean, results: [*]} | void>}
   */
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
      .then(() => {
        // return an object to our calling method:
        return {
          success: true,
          results: [ vals['user_id'], ],
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
   * @param {Object} body
   * @return {Promise}
   */
  this.updateUser = function(userId, body) {
    let sql = 'UPDATE users SET ';
    let where = ' WHERE user_id = :user_id';

    let update = [];
    let values = [];

    if (Object.prototype.hasOwnProperty.call(body, 'first_name')) {
      update.push('first_name = :first_name,');
      values.push(body['first_name']);
    }

    if (Object.prototype.hasOwnProperty.call(body,'last_name')) {
      update.push('last_name =:last_name,');
      values.push(body['last_name']);
    }

    if (Object.prototype.hasOwnProperty.call(body,'email')) {
      update.push('email = :email,');
      values.push(body['email']);
    }

    if (Object.prototype.hasOwnProperty.call(body,'birthday')) {
      update.push('birthday = :birthday,');
      values.push(body['birthday']);
    }

    if (Object.prototype.hasOwnProperty.call(body,'roles')) {
      update.push('roles = :roles,');
      values.push(body['roles']);
    }

    if (Object.prototype.hasOwnProperty.call(body, 'upassword')) {
      let encryptedPassword = bcrypt.hashSync(body.password);

      update.push('upassword = :upassword,');
      values.push(encryptedPassword);
    }

    sql += update.join(',') + where;
    values.push(userId);

    return query(sql, values)
      .then(results => {
        // console.log('updated x records:', results.resultSet.affectedRows);

        let success = results.resultSet.affectedRows === 1;
        return {
          success: success,
          message: success ? 'success' : 'No User Found',
        };
      });
  };

  this.isEmailUnique = function(email) {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE email = :email';
    return query(sql, { email, });
  };

  this.isUuidUnique = function(uuid) {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE user_id = :user_id';

    return query(sql, { user_id: uuid, });
  };
}

module.exports = Users;
