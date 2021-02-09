function ProductController(authService, productService) {

  this.get = function(uuid) {
    return productService.handleGet(uuid);
  };

  this.delete = function(params) {
    let { uuid, } = params;
    return productService.handleDelete(uuid);
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
