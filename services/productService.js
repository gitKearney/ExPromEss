let uuidv4  = require('uuid/v4');

function ProductService(productModel, timeService)
{
  this.productModel = productModel;

  this.handleDelete = function(productId)
  {
    return this.productModel.deleteProduct(productId);
  }

  /**
   *
   * @param {string} productId
   * @returns {Promise<T>}
   */
  this.handleGet = function(productId)
  {
    return productModel.getProductById(productId)
    .then((data) =>
    {
      return data;
    })
    .catch((err) =>
    {
      throw err;
    });
  };

  this.getPaginatedData = function(page)
  {
    return productModel.getProductsByPage(page)
    .then((data) =>
    {
      return data;
    })
    .catch((err) =>
    {
      throw err;
    });
  }

  /**
   *
   * @param {string} uuid
   * @param {Object} params
   * @return {Promise}
   */
  this.handleUpdate = function(uuid, params)
  {
    params.updated_at = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return productModel.updateProduct(uuid, params);
  };

  this.handlePost = function(params)
  {
    params.created_at = timeService.setCurrentTime(new Date()).makeMySQLDatetime();
    params.updated_at = null;

    return new Promise((resolve, reject) =>
    {
      this.productModel.addNewProduct(params)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject({error_msg: err});
      })
    });
  };
}

module.exports = ProductService;
