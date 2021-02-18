const { Router, } = require('express');
const { createCheckoutController, } = require('../factory/Container');

function createCheckoutRoutes() {
  let router = Router();
  let controller = createCheckoutController();

  router.post('/', function(request, response) {
    const auth = request.get('authorization');
    controller.post(request.body, auth)
      .then(res => {
        response.send({success: true, results: res, });
      })
      .catch(err => {
        response.send({success: false, results: [], message: err.message, });
      });
  });

  return router;
}

module.exports = createCheckoutRoutes;
