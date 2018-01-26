let uuidv4  = require('uuid/v4');

function UserService(userModel, timeService)
{
  let parent = this;
  this.userModel = userModel;

  this.handleDelete = function(userId)
  {
    return userModel.deleteUser(userId);
  }

  /**
   *
   * @param params
   * @returns {Promise<T>}
   */
  this.handleGet = function(userId)
  {
    return userModel.getUserById(userId)
      .then((data) =>
      {
        console.log('get returned', data);

        // don't expose the password,
        if (data.success === true) {
          data.results.map(element => delete(element.upassword));
        }

        return data;
      })
      .catch((err) =>
      {
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
  this.handleUpdate = function(uuid, params)
  {
    params.currentTime = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return userModel.updateUser(uuid, params);
  };

  this.handlePost = function(params)
  {
    params.currentTime = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return new Promise(function(resolve, reject)
    {
      parent.userModel.addUser(params)
        .then((data) => {
          console.log('addUser returned:', data);

          resolve(data)
        })
        .catch((err) => {
          reject({error_msg: err});
      })
    });
  };
}

module.exports = UserService;
