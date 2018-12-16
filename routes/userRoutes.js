const di = require('../ioc/Container');

module.exports = function UserRouter(express)
{
  // create a router for user URIs
  let userRouter = express.Router();

  /* middleware section */
  userRouter.use(express.urlencoded({extended: true, inflate: true}))
  userRouter.use(express.json({inflate: true}));

  /* routes section */

  /**
   * this corresponds to GET http://example.com/users
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  userRouter.delete('/:uuid', function(request, response)
  {
    let userController = di.createUserController();

    // userController.get() returns a new promise object
    userController.delete(request)
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
  userRouter.get('/:uuid', function(request, response)
  {
    let userController = di.createUserController();

    // userController.get() returns a new promise object
    userController.get(request)
      .then((res) => {
          response.send(res);
      })
      .catch(err => {
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
  userRouter.get('/', function(request, response)
  {
    let userController = di.createUserController();

    // userController.get() returns a new promise object
    userController.get(request)
    .then((res) => {
      response.send(res);
    })
    .catch(err => {
      response.send(err);
    });
  });

  userRouter.patch('/:uuid', function(request, response)
  {
    let userController = di.createUserController();

    userController.patch(request)
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
  userRouter.post('/', function(request, response)
  {
    let userController = di.createUserController();

    userController.post(request, response)
      .then((res) => {
          response.send(res);
      })
      .catch((err) => {
          response.send(err);
      });
  });

  userRouter.put('/', function(request, response)
  {
    let userController = di.createUserController();

    userController.put(request)
    .then(res => {
      response.send(res);
    })
    .catch(error => {
      response.send(false);
    });
  });

  return userRouter;
}
