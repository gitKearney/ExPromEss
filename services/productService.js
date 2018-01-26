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
      console.log('model returned: ', data);

      return data;
    })
    .catch((err) =>
    {
      console.log('productService caught error ', err);
      throw err;
    });
  };

  /**
   *
   * @param {string} uuid
   * @param {Object} params
   * @return {Promise}
   */
  this.handleUpdate = function(uuid, params)
  {
    params.upated_at = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return productModel.updateProduct(uuid, params);
  };

  this.handlePost = function(params)
  {
    params.created_at = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return new Promise((resolve, reject) =>
    {
      this.productModel.addNewProduct(params)
      .then((data) => {
        console.log('[productService.handlePost] data = ', data);
        resolve(data)
      })
      .catch((err) => {
        console.log('ERROR! [productService.handlePost] error', err);
        reject({error_msg: err});
      })
    });
  };
}

module.exports = ProductService;
