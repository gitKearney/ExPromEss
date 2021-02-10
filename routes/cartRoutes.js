const { Router, } = require('express');
const { createCartController, } = require('../factory/Container');

/**
 * creates routes for cart
 * @return {Router}
 */
function createCartRoutes() {
  let router = Router();
  let controller = createCartController();

  router.get('/:uuid', function(request, response){
    controller.get(request.params['uuid'])
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });

  router.delete('/:uuid', function(request, response){
    controller.delete(request.params['uuid'])
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });


  router.patch('/:uuid', function(request, response){
    controller.patch(request.params['uuid'], request.body)
      .then(res => {
        response.send({ success: true, results: res, });
      })
      .catch(err => {
        response.send({ success: false, message: err, results: [], });
      });
  });

  router.put('/', function(request, response){
    controller.put(request.body)
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
