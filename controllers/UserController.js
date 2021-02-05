
function UserController(authService, userService) {

  /**
   *
   * @param {string} uuid
   * @param {string} bearer
   * @return {PromiseLike<T>}
   */
  this.get = function(uuid, bearer) {
    const requires = uuid === '' ? 'create' : 'edit';

    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], requires))
      .then(() => userService.handleGet(uuid));
  };

  /**
   *
   * @param {string} uuid
   * @param {string} bearer
   * @return {PromiseLike<T>}
   */
  this.delete = function(uuid, bearer) {
    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], 'create'))
      .then(() => userService.handleDelete(uuid));
  };

  /**
   *
   * @param {string} uuid
   * @param {Object} body
   * @param {string} bearer
   * @return {PromiseLike<T>}
   */
  this.patch = function(uuid, body, bearer) {
    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], 'edit'))
      .then(() => userService.handleUpdate(uuid, body));
  };

  /**
   * @param {Object} body
   * @return {*}
   */
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
