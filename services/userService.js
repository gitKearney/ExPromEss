let uuidv4  = require('uuid/v4');

function UserService(userModel, timeService) {
  this.userModel = userModel;

  this.handleDelete = function(userId) {
    return userModel.deleteUser(userId);
  };

  /**
   *
   * @param params
   * @returns {Promise<T>}
   */
  this.handleGet = function(userId) {
    return userModel.getUserById(userId)
      .then((data) => {
        // don't expose the password,
        if (data.success === true) {
          data.results.map(element => delete (element.upassword));
        }

        return data;
      })
      .catch((err) => {
        console.log('UserService caught error ', err);
        throw err;
      });
  };

  /**
   *
   * @param {string} uuid
   * @param {Object} params
   * @return {Promise}
   */
  this.handleUpdate = function(uuid, params) {
    params.currentTime = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return userModel.updateUser(uuid, params);
  };

  this.handlePost = function(params) {
    return this.verifyPostParams(params)
      .then(values => {
        return this.userModel.addUser(values);
      })
      .then((data) => {
        return (data);
      })
      .catch((error) => {
        return (error);
      });
  };

  /**
   *
   * @param {Object} params
   * @return {Promise}
   */
  this.verifyPostParams = function(params) {
    return new Promise((resolve, reject) => {
      params.user_id = uuidv4();
      params.created_at = timeService.setCurrentTime(new Date()).makeMySQLDatetime();
      params.updated_at = null;
      params.roles = 'read'; // all users are read, admin changes them

      // make sure that post contains all columns
      let userColumns  = this.userModel.getColumnNames();
      let insertValues = {};
      let paramCount   = 0;

      for (let param in params) {
        if (params.hasOwnProperty(param)) {
          if (userColumns.indexOf(param) !== -1) {
            insertValues[param] = params[param];
            paramCount++;
          }

          // convert the password to the upassword column
          if (param === 'password') {
            insertValues['upassword'] = params[param];
            paramCount++;
          }
        }
      }

      if (userColumns.length !== paramCount) {
        reject({ success: false, message: 'Invalid Params', results: [], });
      }

      resolve(insertValues);
    });
  };
}

module.exports = UserService;
