function ProductController(authService, productService, userService) {

  this.get = function(uuid, bearer) {
    const requires = 'read';
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => productService.handleGet(uuid));
  };

  this.delete = function(params, bearer) {
    const requires = 'edit';
    let { uuid, } = params;
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => productService.handleDelete(uuid));
  };


  this.patch = function(uuid, body, bearer) {
    const requires = 'edit';
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => productService.handleUpdate(uuid, body));
  };

  this.post = function(body) {
    return productService.handlePost(body)
  };

  this.put = function(body, bearer) {
    const requires = 'edit';
    let uuid = body['id'];
    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => productService.handleUpdate(uuid, body));
  };
}

module.exports = ProductController;
