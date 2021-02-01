const di = require('../factory/Container');

module.exports = function ProductRouter(express)
{
  // create a router for user URIs
  let productsRouter = express.Router();

  /**
   * Return info about a single product
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  productsRouter.get('/:page', function(request, response)
  {
    let productsController = di.createProductsController();

    productsController.get(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });

  return productsRouter;
};
