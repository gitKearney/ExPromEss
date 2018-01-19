const di = require('../dependencies/DependencyInjector');

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
   * this corresponds to POST http://example.com/users
   *
   * @param {Object} request
   * @param {Object} response
   * @returns {string} JSON data stringify
   */
  userRouter.post('/', function(request, response)
  {
    let userController = di.createController();

    userController.post(request, response)
      .then((res) => {
          console.log('[UserRoutes] res', res);
          response.send(res);
      })
      .catch((err) => {
          console.log('[UserRoute] error', err);
          response.send(err);
      });
  });

  return userRouter;
}
