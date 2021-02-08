const { Router, } = require('express');
const { createProductsContainer, } = require('../factory/Container');

module.exports = function ProductRouter()
{
  let productsRouter = Router();
  let productsController = createProductsContainer();

  productsRouter.get('/', function(request, response)
  {
    const auth = request.get('authorization');
    productsController.get({ page: 1, }, auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: [], message: err.message, });
      });
  });

  productsRouter.get('/:page', function(request, response)
  {
    const auth = request.get('authorization');
    const page = request.params['page'];
    productsController.get({ page: page, }, auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: [], message: err.message, });
      });
  });

  return productsRouter;
};
