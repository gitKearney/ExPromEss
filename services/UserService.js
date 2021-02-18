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

  this.userHasPermission = function(userId, requires = '') {
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
          return {
            user_id: 'admin',
            first_name: 'admin',
            last_name: '',
            upassword: '',
            email: '',
            birthday: '',
            roles: 'create',
          };
        }

        return users.getUserById(userId);
      })
      .then(rs => {
        let user = {...rs, has_permission: false, };

        if(rs['role'] === 'create') {
          // this is the equivalent of admin
          user['has_permission'] = true;
          return user;
        }

        const needsReadPermission = requires === 'read';
        const needsEditPermission = requires === 'edit';

        const hasEditPermission = rs['role'] === 'edit';
        const hasReadPermission = rs['role'] === 'read';

        if (hasEditPermission && (needsReadPermission || needsEditPermission)) {
          user['has_permission'] = true;
          return user;
        }

        if (hasReadPermission && needsReadPermission) {
          user['has_permission'] = true;
          return user;
        }

        throw (new Error('Permissions Denied, Foo'));
      });
  };
}

module.exports = UserService;
