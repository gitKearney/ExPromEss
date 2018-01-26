
function UserController(authService, userService)
{
  this.userService = userService;
  this.authService = authService;

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.get = function(request)
  {
    let userId = '';
    if (request.params.hasOwnProperty('uuid')) {
      userId = request.params.uuid;
    }

    return this.authService.decodeJwt(request.headers)
      .then(decodedJwt => {

        // this is an Object that contains email and user_id
        let userInfo = {...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email
        };

        return this.userService.handleGet(userId, userInfo);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        // any call to reject will get caught here
        return error;
      });
  }

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.delete = function(request)
  {
    let userId = request.params.uuid;

    return this.authService.decodeJwt(request.headers)
    .then(decodedJwt => {

      // this is an Object that contains email and user_id
      let userInfo = {...{},
        user_id: decodedJwt.data.user_id,
        email: decodedJwt.data.email
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

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.patch = function(request)
  {
    let uuid = request.params.uuid;
    let body = request.body;

    return this.authService.decodeJwt(request.headers)
      .then(decodedJwt => {

        let userInfo = {...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email
        };

        return this.userService.handleUpdate(uuid, body);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  }

  /**
   *
   * @param {Object} request
   * @return {Promise<any>}
   */
  this.post = function(request)
  {
    return this.userService.handlePost(request.body)
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  }

  /**
   *
   * @param {Object} request
   * @return {Promise}
   */
  this.put = function(request)
  {
    let uuid = request.body.uuid;
    let body = request.body;

    return this.authService.decodeJwt(request.headers)
      .then(decodedJwt => {

        let userInfo = {...{},
          user_id: decodedJwt.data.user_id,
          email: decodedJwt.data.email
        };

        return this.userService.handleUpdate(uuid, body);
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
  }
}

module.exports =  UserController;
