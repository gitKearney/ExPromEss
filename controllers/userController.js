
function UserController(userService)
{
  let parent = this;

  this.userService = userService;

  this.get = function(request, response)
  {
    return new Promise(function(resolve, reject)
    {
      let userInfo = request.query;

      // userService.handleGet() returns a promise object from the userModel
      parent.userService.handleGet(userInfo)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  this.post = function(request)
  {
    return new Promise(function(resolve, reject)
    {
      parent.userService.handlePost(request.body)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log('ERROR! [userController.post]', err)
          reject(err);
        });
    });
  }
}

module.exports =  UserController;
