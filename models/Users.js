const bcrypt = require('bcrypt-nodejs');
const query  = require('./_Query');
const uuidv4 = require('uuid/v4');

function Users() {
  this.deleteUser = function(userId) {
    let sql = 'UPDATE users SET active = \'no\' WHERE user_id = :user_id';
    return query(sql, { user_id: userId, })
      .then(results => results.resultSet.affectedRows === 1);
  };

  this.getUser = function(sql, params) {
    return query(sql, params)
      .then((results) => {
        if (results.resultSet.length === 0) {
          return {role: '', };
        }

        return results.resultSet[0];
      });
  };

  this.getUsers = function(id) {
    if (id.length !== 0) {
      return this.getUserById(id);
    }

    const sql = `SELECT user_id, first_name, last_name, upassword, email,
      birthday, roles as role FROM users`;

    return query(sql, {})
      .then((results) => {
        return results.resultSet;
      });
  };

  this.getUserByEmail = function(email) {
    let sql = `SELECT user_id, first_name, last_name, upassword, email,
birthday, roles as role FROM users WHERE email = :email`;

    return this.getUser(sql, { email, });
  };

  this.getUserById = function(id) {
    let sql = `SELECT user_id, first_name, last_name, upassword, email, 
birthday, roles as role FROM users WHERE user_id = :user_id`;

    return this.getUser(sql, { user_id: id, });
  };


  this.addUser = function(values) {
    values['upassword'] = bcrypt.hashSync(values['password']);
    values['active'] = 'yes';

    let userId = null;
    return this.isEmailUnique(values['email'])
      .then((emailResults) => {
        if (emailResults.resultSet[0]['found'] === 1) {
          throw new Error('user already registered');
        }

        return this.getUuids();
      })
      .then(uuidResults => {
        let ids = uuidResults.resultSet;
        let index = -1;
        do {
          userId = uuidv4();
          index = ids.findIndex(element => element.product_id === userId);
        } while(index !== -1);

        values['user_id'] = userId;
        let sql = `
INSERT INTO users 
  (user_id, first_name, last_name, upassword, email, birthday, roles, active)
VALUES 
  (:user_id, :first_name, :last_name, :upassword, :email, :birthday, :roles, :active)`;

        return query(sql, values);
      })
      .then(() => {
        return values['user_id'];
      });
  };

  this.updateUser = function(userId, body) {
    let update = [];
    let values = { user_id: userId, };

    if (Object.prototype.hasOwnProperty.call(body, 'first_name')) {
      update.push('first_name = :first_name');
      values['first_name'] = body['first_name'];
    }

    if (Object.prototype.hasOwnProperty.call(body,'last_name')) {
      update.push('last_name =:last_name');
      values['last_name'] = body['last_name'];
    }

    if (Object.prototype.hasOwnProperty.call(body,'email')) {
      update.push('email = :email');
      values['email'] = body['email'];
    }

    if (Object.prototype.hasOwnProperty.call(body,'birthday')) {
      update.push('birthday = :birthday');
      values['birthday'] = body['birthday'];
    }

    if (Object.prototype.hasOwnProperty.call(body,'roles')) {
      update.push('roles = :roles');
      values['roles'] = body['roles'];
    }

    if (Object.prototype.hasOwnProperty.call(body, 'password')) {
      let encryptedPassword = bcrypt.hashSync(body.password);
      update.push('upassword = :upassword');
      values['upassword'] = encryptedPassword;
    }

    let sets = update.join(',');


    let sql = `UPDATE users SET ${sets} WHERE user_id = :user_id`;

    return query(sql, values)
      .then(results => {
        return results.resultSet.affectedRows === 1;
      });
  };

  this.isEmailUnique = function(email) {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE email = :email';
    return query(sql, { email, });
  };

  this.getUuids = function() {
    let sql = 'SELECT user_id FROM users';

    return query(sql, { });
  };
}

module.exports = Users;
