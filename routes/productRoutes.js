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

    productController.delete(request.params)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });

  productRouter.get('/:uuid', function(request, response)
  {
    productController.get(request.params['uuid'])
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
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


  productRouter.put('/', function(request, response)
  {
    productController.put(request.body)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });

  return productRouter;
}

module.exports = ProductRouter;
