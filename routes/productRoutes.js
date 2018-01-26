const di = require('../dependencies/DependencyInjector');

module.exports = function ProductRouter(express)
{
  // create a router for user URIs
  let productRouter = express.Router();

  /* middleware section */
  productRouter.use(express.urlencoded({extended: true, inflate: true}));
  productRouter.use(express.json({inflate: true}));

  /* routes section */

  /**
   * this corresponds to GET http://example.com/users
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  productRouter.delete('/:uuid', function(request, response)
  {
    let productController = di.createproductController();

    productController.delete(request)
    .then((res) => {
      console.log('resolving:', res);
      response.send(res);
    })
    .catch(err => {
      console.log('rejecting:', err);

      response.send(err);
    });
  });

  /**
   * this corresponds to GET http://example.com/users
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  productRouter.get('/:uuid', function(request, response)
  {
    let productController = di.createProductController();

    // productController.get() returns a new promise object
    productController.get(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });


  productRouter.get('/', function(request, response)
  {
    let productController = di.createProductController();

    // productController.get() returns a new promise object
    productController.get(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });


  productRouter.patch('/:uuid', function(request)
  {
    let productController = di.createProductController();

    productController.patch(request)
    .then(res => {
      response.send(res);
    })
    .catch(error => {
      response.send(false);
    });
  });

  /**
   * this corresponds to POST http://example.com/users
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  productRouter.post('/', function(request, response)
  {
    let productController = di.createProductController();

    productController.post(request)
    .then((res) => {
      console.log('[ProductRouter.post] res', res);
      response.send(res);
    })
    .catch((err) => {
      console.log('[ProductRoutes] error', err);
      response.send(err);
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
