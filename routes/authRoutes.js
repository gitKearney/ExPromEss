const { Router, } = require('express');
let { createAuthController, } = require('../factory/Container');

module.exports = function()
{
  let authRouter = Router();

  authRouter.post('/', function(request, response) {
    let authController = createAuthController();

    authController.post(request)
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send({ success: false, message: err.message, });
    });
  });

  return authRouter;
};
