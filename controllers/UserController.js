
function UserController(authService, userService) {

  this.get = function(uuid, bearer) {
    // e.g. of how to use authentication
    const requires = uuid === '' ? 'create' : 'edit';

    return authService.decode(bearer)
      .then((user) => userService.canUserAccess(user.data['user_id'], requires))
      .then(() => userService.handleGet(uuid));
  };

  // eslint-disable-next-line no-unused-vars
  this.delete = function(uuid, bearer) {
    return userService.handleDelete(uuid);
  };

  // eslint-disable-next-line no-unused-vars
  this.patch = function(uuid, body, bearer) {
    return userService.handleUpdate(uuid, body);
  };

  this.post = function(body) {
    return userService.handlePost(body);
  };

  // eslint-disable-next-line no-unused-vars
  this.put = function(body, bearer) {
    const uuid = body['user_id'];
    return userService.handleUpdate(uuid, body);
  };
}

module.exports = UserController;
