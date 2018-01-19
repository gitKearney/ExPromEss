let di = require('../dependencies/DependencyInjector');

module.exports = function(express)
{
  let authRouter = express.Router();

  /* middleware section */
  authRouter.use(express.urlencoded({extended: true, inflate: true}))
  authRouter.use(express.json({inflate: true}));

  authRouter.post('/', function(request, response)
  {
    let authController = di.createAuthController();

    authController.post(request)
    .then((res) => {
      console.log('[AuthRoute] token: ', res);
      response.send(res);
    })
    .catch((err) => {
      console.log('[AuthRoute] error', err);
      response.send(err);
    });
  });
  return authRouter;
}
