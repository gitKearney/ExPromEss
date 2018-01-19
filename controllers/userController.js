
function UserController(userService)
{
  let parent = this;

  this.userService = userService;

  this.get = function(request)
  {
    return new Promise(function(resolve, reject)
    {
      if (request.headers.hasOwnProperty('authorization') === false) {
        reject({error: "Access Denied: Invalid Headers"});
      }

      resolve(request.params.uuid);
    })
    .then(userId => {
      return parent.userService.handleGet(userId)
    })
    .then((data) => {
      return(data);
    })
    .catch((err) => {
      throw(err);
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
