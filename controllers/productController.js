function ProductController(authService, productService)
{
  this.productService = productService;
  this.authService = authService;

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.get = function(request)
  {
    let productId = '';
    if (request.params.hasOwnProperty('uuid')) {
      productId = request.params.uuid;
    }

    return this.authService.decodeJwt(request.headers)
    .then((decodedJwt) => {

      let userInfo = {...{},
        user_id: decodedJwt.data.user_id,
        email: decodedJwt.data.email
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

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.delete = function(request)
  {
    let uuid = request.params.uuid;

    return this.authService.decodeJwt(request.headers)
    .then((decodedJwt) => {

      let userInfo = {...{},
        user_id: decodedJwt.data.user_id,
        email: decodedJwt.data.email
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

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.patch = function(request)
  {
    let uuid = request.params.uuid;
    let body = request.body;

    return this.authService.decodeJwt(request.headers)
    .then((decodedJwt) => {
      let userInfo = {...{},
        user_id: decodedJwt.data.user_id,
        email: decodedJwt.data.email
      };

      return this.productService.handleUpdate(uuid, body);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  };

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.post = function(request)
  {
    return this.authService.decodeJwt(request.headers)
      .then((decodedJwt) => {

        let userInfo = {...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email
        };

        return this.productService.handlePost(request.body)
      })
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  };

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.put = function(request)
  {
    let uuid = request.body.id;
    let body = request.body;

    return this.authService.decodeJwt(request.headers)
    .then((decodedJwt) => {

      let userInfo = {...{},
        user_id: decodedJwt.data.user_id,
        email: decodedJwt.data.email
      };

      return this.productService.handleUpdate(uuid, body);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  }
}

module.exports =  ProductController;
