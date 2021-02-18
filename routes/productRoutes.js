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
    const auth = request.get('authorization');

    productController.delete(request.params, auth)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });

  productRouter.get('/:uuid', function(request, response)
  {
    const auth = request.get('authorization');

    productController.get(request.params['uuid'], auth)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });


  productRouter.patch('/:uuid', function(request, response)
  {
    const auth = request.get('authorization');

    productController.patch(request.params['uuid'], request.body, auth)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });


  productRouter.post('/', function(request, response)
  {
    const auth = request.get('authorization');

    productController.post(request.body, auth)
      .then((res) => {
        response.send({ success: true, results: res, });
      })
      .catch((err) => {
        response.send({ success: false, results: err, });
      });
  });


  productRouter.put('/', function(request, response)
  {
    const auth = request.get('authorization');

    productController.put(request.body, auth)
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
