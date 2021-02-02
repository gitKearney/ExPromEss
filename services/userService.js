let uuidv4  = require('uuid/v4');
const bcrypt = require('bcrypt-nodejs');

const Users = require('../models/Users');
const TimeService = require('./timeService');

/**
 * 
 * @param {Users} users 
 * @param {TimeService} timeService 
 */
function UserService(users, timeService) {

  this.handleDelete = function(userId) {
    return userModel.deleteUser(userId);
  };

  this.handleGet = function(userId) {
    // TODO: does requestor have access to this user's info?
    return users.getUserById(userId)
      .then((data) => {
        // don't expose the password,
        if (data.success === true) {
          data.results.forEach(element => delete(element.upassword));
        }

        return data;
      })
      .catch((err) => {
        console.log('UserService caught error ', err);
        throw err;
      });
  };

  this.handleUpdate = function(uuid, params) {
    return users.updateUser(uuid, params);
  };

  this.handlePost = function(params) {
    const values = this.verifyPostParams(params);
    return users.addUser(values);
  };

  this.verifyPostParams = function(params) {
    params.user_id = uuidv4();
    
    let insertValues = {
      'user_id':    params.user_id ?? null,
      'first_name': params.first_name ?? null,
      'last_name':  params.last_name ?? null,
      'upassword':  params.password ?? null,
      'email':      params.email ?? null,
      'birthday':   params.birthday ?? null,
      'roles':      'read', // all users are read, admin changes them
    };

    return insertValues;
  };
}

module.exports = UserService;
