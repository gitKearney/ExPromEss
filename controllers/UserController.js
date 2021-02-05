/**
 *
 * @param { AuthService } authService
 * @param { UserService } userService
 * @constructor
 */
function UserController(authService, userService) {

  /**
   *
   * @param {string} uuid
   * @param {string} bearer
   * @return {*}
   */
  this.get = function(uuid, bearer) {
    const requires = uuid === '' ? 'create' : 'edit';

    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], requires))
      .then(() => userService.handleGet(uuid));
  };

  this.delete = function(uuid, bearer) {
    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], 'create'))
      .then(() => userService.handleDelete(uuid));
  };

  this.patch = function(uuid, body, bearer) {
    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], 'edit'))
      .then(() => userService.handleUpdate(uuid, body));
  };

  this.post = function(body) {
    return userService.handlePost(body);
  };

  this.put = function(body, bearer) {
    const uuid = body['uuid'];
    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], 'edit'))
      .then(() => userService.handleUpdate(uuid, body));
  };
}

module.exports = UserController;
