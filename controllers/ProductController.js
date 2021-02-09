function ProductController(authService, productService) {

  this.get = function(request) {
    let productId = '';
    if (request.params.hasOwnProperty('uuid')) {
      productId = request.params.uuid;
    }

    return this.authService.decodeJwt(request.headers)
      .then((decodedJwt) => {
        let userInfo = { ...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email,
        };

        return this.productService.handleGet(productId);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  };

  this.delete = function(request) {
    let uuid = request.params.uuid;

    return this.authService.decodeJwt(request.headers)
      .then((decodedJwt) => {
        let userInfo = { ...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email,
        };

        return this.productService.handleDelete(uuid);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  };


  this.patch = function(uuid, body) {
    return productService.handleUpdate(uuid, body);
  };

  this.post = function(body) {
    return productService.handlePost(body);
  };

  this.put = function(body) {
    let uuid = body['id'];
    return productService.handleUpdate(uuid, body);
  };
}

module.exports = ProductController;
