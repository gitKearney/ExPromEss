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
    params.created_at = timeService.setCurrentTime(new Date()).makeMySQLDatetime();
    params.updated_at = null;
    params.roles      = 'read'; // all users are read, admin changes them

    return parent.userModel.addUser(params)
    .then((data) => {
      return (data)
    })
    .catch((error) => {
      return (error);
    })
  };
}

module.exports = UserService;
