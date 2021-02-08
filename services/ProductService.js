function ProductService(productModel) {

  this.handleDelete = function(productId) {
    return productModel.deleteProduct(productId);
  };

  this.handleGet = function(productId) {
    return productModel.getProductById(productId);
  };

  this.getPaginatedData = function(page) {
    return productModel.getProductsByPage(page);
  };

  this.handleUpdate = function(uuid, params) {
    return productModel.updateProduct(uuid, params);
  };

  this.handlePost = function(params) {
    return productModel.addNewProduct(params);
  };
}

module.exports = ProductService;
