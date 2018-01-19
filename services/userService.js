let uuidv4  = require('uuid/v4');

function UserService(userModel, timeService)
{
  let parent = this;
  this.userModel = userModel;

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
        delete(data['upassword']);
        return data;
      })
      .catch((err) =>
      {
        console.log('UserService caught error ', err);
        throw err;
      });
  }

  this.handlePost = function(params)
  {
    params.currentTime = timeService.setCurrentTime(new Date()).makeMySQLDatetime();

    return new Promise(function(resolve, reject)
    {
      parent.userModel.addUser(params)
        .then((data) => {
            console.log('[UserService] data = ', data);
            resolve(data)
        })
        .catch((err) => {
            console.log('ERROR! [userService.handlePost] error', err);
            reject({error_msg: err});
      })
    });
  }
}

module.exports = UserService;
