const { Router, } = require('express');
const { createCheckoutController, } = require('../factory/Container');

function createCheckoutRoutes() {
  let router = Router();
  let controller = createCheckoutController();

  router.post('/', function(request, response) {
    controller.post(request.body)
      .then(res => {
        response.send({success: true, results: res, });
      })
      .catch(err => {
        response.send({success: false, results: [], message: err, });
      });
  });

  return router;
}

module.exports = createCheckoutRoutes;
