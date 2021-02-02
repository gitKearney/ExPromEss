const { Router, } = require('express');

const {createUserController} = require('../factory/Container');

function createUserRouter() {
  /** @type {Router} */
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

        response.send({ success: false, messaage: err.message, });
      });
  });


  userRouter.get('/:uuid', function(request, response) {
    userController.get(request.params)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send({ success: false, messaage: err.message, });
      });
  });

  userRouter.get('/', function(request, response) {
    userController.get(request.params)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send({ success: false, messaage: err.message, });
      });
  });

  userRouter.patch('/:uuid', function(request, response) {
    // TODO: pass in UUID & body
    userController.patch(request)
      .then(res => {
        response.send(res);
      })
      .catch((err) => {
        response.send({ success: false, messaage: err.message, });
      });
  });

  userRouter.post('/', function(request, response) {
    userController.post(request.body)
      .then((res) => {
        console.log('RES (GOOD)', res);
        response.send(res);
      })
      .catch((err) => {
        console.log('RES (ERROR)', err.message);
        response.send({success: false, message: err.message});
      });
  });

  userRouter.put('/', function(request, response) {
    userController.put(request)
      .then(res => {
        response.send(res);
      })
      .catch((err) => {
        response.send({ success: false, message: err.message, });
      });
  });

  return userRouter;
}

module.exports = createUserRouter;
