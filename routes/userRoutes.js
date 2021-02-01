const { Router } = require('express');
const UserController = require('../controllers/userController');

const {createUserController} = require('../factory/Container');

function createUserRouter(express) {
  /** @type {Router} */
  let userRouter = Router();

  /** @type {UserController} */
  let userController = createUserController();

  userRouter.delete('/:uuid', function(request, response) {
    userController.delete(request.params)
      .then((res) => {
        console.log('resolving:', res);
        response.send(res);
      })
      .catch(err => {
        console.log('rejecting:', err);

        response.send(err);
      });
  });

  
  userRouter.get('/:uuid', function(request, response) {
    userController.get(request.params)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send(err);
      });
  });

  userRouter.get('/', function(request, response) {
    userController.get(request.params)
      .then((res) => {
        response.send(res);
      })
      .catch(err => {
        response.send(err);
      });
  });

  userRouter.patch('/:uuid', function(request, response) {
    // TODO: pass in UUID & body
    userController.patch(request)
      .then(res => {
        response.send(res);
      })
      .catch(() => {
        response.send(false);
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
      .catch(() => {
        response.send(false);
      });
  });

  return userRouter;
};

module.exports = createUserRouter;
