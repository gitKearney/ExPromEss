
function ProductsController(authService, productService) {
  this.productService = productService;
  this.authService = authService;

  this.get = function(request) {
    let page = 1;
    if (request.params.hasOwnProperty('page')) {
      page = parseInt(request.params.page);
    }

    return this.authService.decodeJwt(request.headers)
      .then((decodedJwt) => {
        let userInfo = { ...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email,
        };

        return this.productService.getPaginatedData(page);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  };
}

module.exports = ProductsController;
