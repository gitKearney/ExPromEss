
function ProductsController(authService, productService, userService) {

  this.get = function(params, bearer) {
    let requires = 'read';
    let page = 1;
    if (Object.prototype.hasOwnProperty.call(params, 'page')) {
      page = parseInt(params['page']);
    }

    return authService.decode(bearer)
      .then((user) => userService.userHasPermission(user.data['user_id'], requires))
      .then(() => productService.getPaginatedData(page));
  };
}

module.exports = ProductsController;
