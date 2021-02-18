const { Router, } = require('express');
const { createTransactionController, } = require('../factory/Container');

/**
 * @return {Router}
 */
function createTransactionRouter() {
  let router = Router();
  let controller = createTransactionController();

  router.get('/:uuid', function(request, response) {
    const auth = request.get('authorization');
    let transId = request.params['uuid'] ?? '';
    controller.get(transId, auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: err.message, });
      });
  });

  router.get('/', function(request, response) {
    const auth = request.get('authorization');
    let transId = request.params['uuid'] ?? '';
    controller.get(transId, auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: err.message, });
      });
  });

  router.patch('/:uuid', function(request, response) {
    controller.patch(request.params.uuid, request.body)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: err.message, });
      });
  });

  return router;
}

module.exports = createTransactionRouter;
