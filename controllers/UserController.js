/**
 *
 * @param { AuthService } authService
 * @param { UserService } userService
 * @constructor
 */
function UserController(authService, userService) {

  /**
   *
   * @param {string} uuid
   * @param {string} authorization
   * @return {*}
   */
  this.get = function(uuid, authorization) {
    return authService.authenticate(authorization)
      .then((user) => {
        const requires = uuid === '' ? 'create' : 'edit';
        return userService.canUserAccess(user.data['user_id'], requires);
      })
      .then(() => userService.handleGet(uuid));
  };

  this.delete = function(request) {
    let userId = request.params.uuid;

    return authService.authenticate(request.headers.get('authorization'))
      .then(decodedJwt => {
        // decodedJwt is an Object that contains email and user_id
        let userInfo = { ...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email,
        };

        return this.userService.handleDelete(userId, userInfo);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  };

  this.patch = function(request) {
    let uuid = request.params.uuid;
    let body = request.body;

    return this.authService.decodeJwt(request.headers)
      .then(decodedJwt => {
        // let userInfo = { ...{},
        //   user_id: decodedJwt.data.user_id,
        //   email: decodedJwt.data.email,
        // };

        return this.userService.handleUpdate(uuid, body);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  };

  this.post = function(body) {
    return userService.handlePost(body);
  };

  this.put = function(request) {
    let uuid = request.body.id;
    let body = request.body;

    return userService.handleUpdate(uuid, body)
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  };
}

module.exports = UserController;
