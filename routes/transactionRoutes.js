const { Router, } = require('express');
const { createTransactionController, } = require('../factory/Container');

/**
 * @return {Router}
 */
function createTransactionRouter() {
  let router = Router();
  let controller = createTransactionController();

  router.get('/:uuid', function(request, response) {
    // TODO: const auth = request.get('authorization');
    controller.get(request.params['uuid'])
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: err, });
      });
  });

  router.get('/', function(request, response) {
    // TODO: const auth = request.get('authorization');
    controller.get()
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: err, });
      });
  });

  router.patch('/:uuid', function(request, response) {
    controller.patch(request.params.uuid, request.body)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, results: err, });
      });
  });

  return router;
}

module.exports = createTransactionRouter;
