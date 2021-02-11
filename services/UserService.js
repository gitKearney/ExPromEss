let uuidv4  = require('uuid/v4');
let configs = require('../configs/jwt.example');

function UserService(users) {

  this.handleDelete = function(userId) {
    return users.deleteUser(userId);
  };

  this.handleGet = function(userId) {
    return users.getUsers(userId)
      .then(results => {
        // don't expose the password
        if (Array.isArray(results)) {
          results.forEach(element => delete(element.upassword));
        } else {
          delete results['upassword'];
        }
        return results;
      })
      .catch((err) => {
        console.log('UserService caught error ', err);
        throw err;
      });
  };

  this.handleUpdate = function(uuid, body) {
    return users.updateUser(uuid, body);
  };

  this.handlePost = function(params) {
    const values = this.verifyPostParams(params);
    return users.addUser(values)
      .then(uuid => uuid);
  };

  this.verifyPostParams = function(params) {
    return {
      'user_id': uuidv4(),
      'first_name': params.first_name ?? null,
      'last_name': params.last_name ?? null,
      'password': params.password ?? null,
      'email': params.email ?? null,
      'birthday': params.birthday ?? null,
      'roles': 'read', // all users are read, admin changes them
    };
  };

  /**
   * @param {string} userId
   * @param {string} requires
   * @param {string} uuid - the ID the bearer is requesting info about
   * @return {Promise<Object>}
   */
  this.canUserAccess = function(userId, requires, uuid) {
    const skipCheck = new Promise((resolve) => {
      if (configs.disable_auth) {
        resolve(true);
        return;
      }

      resolve(false);
    });

    return skipCheck
      .then((skip) => {
        if (skip) {
          return true;
        }

        return users.getUserById(userId);
      })
      .then(rs => {
        // if auth checking is disabled, just return true
        if (rs === true) {
          return true;
        }

        if(rs['role'] === 'create') {
          // this is the equivalent of admin
          return true;
        }

        const needsReadPermission = requires === 'read';
        const needsEditPermission = requires === 'edit';

        const hasEditPermission = rs['role'] === 'edit';
        const hasReadPermission = rs['role'] === 'read';

        if (hasEditPermission && (needsReadPermission || needsEditPermission)) {
          return true;
        }

        if (hasReadPermission && needsReadPermission) {
          if (uuid === rs['user_id']) {
            return true;
          }
        }

        throw (new Error('Permissions Denied, Foo'));
      });
  };
}

module.exports = UserService;
