/**
 * @param {AuthService} authService
 * @param {UserService} userService
 */
function UserController(authService, userService) {
  // TODO: pass in request
  this.get = function(params) {
    // TODO: get request.get("Authorization")
    let userId = '';
    if (params.hasOwnProperty('uuid')) {
      userId = params.uuid;
    }

    return userService.handleGet(userId);
  };

  this.delete = function(request) {
    let userId = request.params.uuid;

    return authService.decodeJwt(request.headers)
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
}

module.exports = UserController;
