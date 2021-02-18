
function UserController(authService, userService) {

  this.get = function(uuid, bearer) {
    // e.g. of how to use authentication
    const requires = uuid === '' ? 'edit' : 'read';

    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then((rs) => userService.handleGet(uuid, rs));
  };

  this.delete = function(uuid, bearer) {
    const requires = 'edit';
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then((rs) => userService.handleDelete(uuid, rs));
  };

  this.patch = function(uuid, body, bearer) {
    const requires = 'read';
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then((rs) => userService.handleUpdate(uuid, body, rs));
  };

  this.post = function(body) {
    return userService.handlePost(body);
  };

  this.put = function(body, bearer) {
    const requires = 'read';
    const uuid = body['user_id'];
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then((rs) => userService.handleUpdate(uuid, body, rs));
  };
}

module.exports = UserController;
