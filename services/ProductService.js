function ProductService(products) {

  this.handleDelete = function(productId) {
    return products.deleteProduct(productId);
  };

  this.handleGet = function(productId) {
    return products.getProductById(productId);
  };

  this.getPaginatedData = function(page) {
    return products.getProductsByPage(page)
      .then(rs => rs.resultSet);
  };

  this.handleUpdate = function(uuid, params) {
    return products.updateProduct(uuid, params);
  };

  this.handlePost = function(params) {
    const values = {
      title: params['title'] ?? null,
      price: params['price'] ?? null,
      quantity: params['quantity'] ?? null,
    };

    return products.addNewProduct(values);
  };
}

module.exports = ProductService;
