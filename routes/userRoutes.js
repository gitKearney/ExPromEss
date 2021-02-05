const { Router, } = require('express');

const { createUserController, } = require('../factory/Container');

function createUserRouter() {
  let userRouter = Router();

  let userController = createUserController();

  userRouter.delete('/:uuid', function(request, response) {
    userController.delete(request.params)
      .then((res) => {
        console.log('resolving:', res);
        response.send(res);
      })
      .catch(err => {
        console.log('rejecting:', err);

        response.send({ success: false, message: err.message, });
      });
  });

  userRouter.get('/:uuid', function(request, response) {
    const auth = request.get('authorization');
    userController.get(request.params['uuid'], auth)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send({ success: false, message: err.message, });
      });
  });

  userRouter.get('/', function(request, response) {
    const auth = request.get('authorization');
    userController.get('', auth)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send({ success: false, message: err.message, });
      });
  });

  userRouter.patch('/:uuid', function(request, response) {
    const auth = request.get('authorization');
    userController.patch(request.params['uuid'], request.body, auth)
      .then(res => {
        response.send({success: true, result: res, });
      })
      .catch((err) => {
        response.send({ success: false, message: err.message, });
      });
  });

  userRouter.post('/', function(request, response) {
    userController.post(request.body)
      .then((res) => {
        response.send({success: true, result: res, });
      })
      .catch((err) => {
        response.send({success: false, message: err.message, });
      });
  });

  userRouter.put('/', function(request, response) {
    const auth = request.get('authorization');
    userController.put(request.body, auth)
      .then(res => {
        response.send({success: true, result: res, });
      })
      .catch((err) => {
        response.send({ success: false, message: err.message, });
      });
  });

  return userRouter;
}

module.exports = createUserRouter;
