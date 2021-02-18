const { Router, } = require('express');
const { createCartController, } = require('../factory/Container');

/**
 * creates routes for cart
 * @return {Router}
 */
function createCartRoutes() {
  let router = Router();
  let controller = createCartController();

  router.get('/:uuid', function(request, response) {
    const auth = request.get('authorization');

    controller.get(request.params['uuid'], auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });

  router.delete('/:uuid', function(request, response){
    const auth = request.get('authorization');
    controller.delete(request.params['uuid'], auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });


  router.patch('/:uuid', function(request, response){
    const auth = request.get('authorization');
    controller.patch(request.params['uuid'], request.body, auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });

  router.put('/', function(request, response){
    const auth = request.get('authorization');
    controller.put(request.body, auth)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });


  return router;
}

module.exports = createCartRoutes;
