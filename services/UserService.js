let uuidv4  = require('uuid/v4');

/**
 *
 * @param {Users} users
 * @param {TimeService} timeService
 */
function UserService(users) {

  this.handleDelete = function(userId) {
    return users.deleteUser(userId);
  };

  this.handleGet = function(userId) {
    // TODO: does requester have access to this user's info?
    return users.getUserById(userId)
      .then((data) => {
        // don't expose the password
        if (data.success === true) {
          data.results.forEach(element => delete(element.upassword));
        }

        return data;
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
    return users.addUser(values);
  };

  this.verifyPostParams = function(params) {
    let insertValues = {
      'user_id':    uuidv4(),
      'first_name': params.first_name ?? null,
      'last_name':  params.last_name ?? null,
      'upassword':  params.password ?? null,
      'email':      params.email ?? null,
      'birthday':   params.birthday ?? null,
      'roles':      'read', // all users are read, admin changes them
    };

    return insertValues;
  };

  /**
   *
   * @param {string} userId
   * @param {string} requires
   * @return {Promise<bool>}
   */
  this.canUserAccess = function(userId, requires) {
    return users.getUserById(userId)
      .then((rs) => {
        if(rs['role'] === 'create') {
          // this is the equivalent of admin
          return true;
        }

        const needsEditPermission = requires === 'edit';
        const hasEditPermission = rs['role'] === 'edit';
        if (hasEditPermission && needsEditPermission) {
          return true;
        }

        const needsReadPermission = requires === 'read';
        if (hasEditPermission && needsReadPermission) {
          return true;
        }

        const hasReadPermission = rs['role'] === 'read';
        return (hasReadPermission && needsEditPermission);
      });
  };
}

module.exports = UserService;
