let UserController = require('../controllers/userController');
let UserService    = require('../services/userService');
let UserModel      = require('../models/user');
let TimeService    = require('../services/timeService');

module.exports = function(express)
{
    // create a router for user URIs
    let userRouter = express.Router();

    // create our user model, inject its dependencies into it
    let userModel = new UserModel();
    let timeService = new TimeService();
    let userService = new UserService(userModel, timeService);
    let userController = new UserController(userService);

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
    userRouter.get('/', function(request, response)
    {
      // userController.get() returns a new promise object
      userController.get(request, response)
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
};
