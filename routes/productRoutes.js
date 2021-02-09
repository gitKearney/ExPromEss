const { Router, } = require('express');
const { createProductController, } = require('../factory/Container');

/**
 * The GET route '/' has been disabled because we want the user pointing
 * to a different route to get all products
 */
function ProductRouter() {
  let productRouter = Router();
  let productController = createProductController();

  productRouter.delete('/:uuid', function(request, response) {

    productController.delete(request)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send(err);
      });
  });

  productRouter.get('/:uuid', function(request, response)
  {
    productController.get(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });


  productRouter.patch('/:uuid', function(request, response)
  {
    productController.patch(request.params['uuid'], request.body)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });


  productRouter.post('/', function(request, response)
  {
    productController.post(request.body)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });

  /**
   * this corresponds to POST http://example.com/users
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  productRouter.put('/', function(request, response)
  {
    let productController = di.createProductController();

    productController.put(request)
    .then(res => {
      response.send(res);
    })
    .catch(error => {
      response.send(false);
    });
  });

  return productRouter;
}

module.exports = ProductRouter;
