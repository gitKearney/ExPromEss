
function ProductsController(authService, productService, userService) {

  this.get = function(params, bearer) {
    let page = 1;
    if (Object.prototype.hasOwnProperty.call(params, 'page')) {
      page = parseInt(params['page']);
    }

    return authService.decode(bearer)
    .then((user) => userService.canUserAccess(user.data['user_id'], 'create'))
    .then(() => productService.getPaginatedData(page));
  };
}

module.exports = ProductsController;
