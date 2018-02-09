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
    let productController = di.createProductController();

    productController.delete(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });

  /**
   * Return info about a single product
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

  // TODO: disable this route - only have products
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


  productRouter.patch('/:uuid', function(request, response)
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
      response.send(res);
    })
    .catch((err) => {
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
