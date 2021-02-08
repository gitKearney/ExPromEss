function ProductService(productModel) {

  this.handleDelete = function(productId) {
    return productModel.deleteProduct(productId);
  };

  this.handleGet = function(productId) {
    return productModel.getProductById(productId)
      .then(rs => rs.resultSet);
  };

  this.getPaginatedData = function(page) {
    return productModel.getProductsByPage(page)
      .then(rs => rs.resultSet);
  };

  this.handleUpdate = function(uuid, params) {
    return productModel.updateProduct(uuid, params);
  };

  this.handlePost = function(params) {
    const values = {
      title: params['title'] ?? null,
      price: params['price'] ?? null,
      quantity: params['quantity'] ?? null,
    };

    return productModel.addNewProduct(values);
  };
}

module.exports = ProductService;
