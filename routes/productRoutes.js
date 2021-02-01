const {createProductController} = require('../factory/Container');

function ProductRouter(express) {
  // create a router for user URIs
  let productRouter = express.Router();

  /**
   * this corresponds to GET http://example.com/users
   *
   * @param {Request} request
   * @param {Response} response
   * @returns {string} JSON data stringify
   */
  productRouter.delete('/:uuid', function(request, response) {
    let productController = createProductController();

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
    let productController = createProductController();

    // productController.get() returns a new promise object
    productController.get(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });

  /**
   * The GET route '/' has been disabled because we want the user pointing
   * to a different route to get all products
   */

  /**
   * @param {string} uuid
   * @param {function} callback function
   * @returns {void}
   */
  productRouter.patch('/:uuid', function(request, response)
  {
    let productController = createProductController();

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

module.exports = ProductRouter;
