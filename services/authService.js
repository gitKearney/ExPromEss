let bcrypt      = require('bcrypt-nodejs');
let jwt         = require('jsonwebtoken');
let appConfigs  = require('../configs/jwt.example');
const MyError   = require('../errors/BaseError');
const Users = require('../models/Users');

/**
 * 
 * @param {Users} user 
 */
function AuthService(user) {
  const info = {email: '', user_id: ''};

  this.authenticate = function(body) {
    if (!body.hasOwnProperty('password') || !body.hasOwnProperty('email')) {
      throw new Error('Invalid Post Values');
    }
  
    return user.getUserByEmail(body.email)
      .then(res => {
        if (!res.success) {
          throw new Error('Invalid Email');
        }

        const email = res.results[0]['email'];
        const passwd = res.results[0]['upassword'];
        const userId = res.results[0]['user_id'];

        info['email'] = email;
        info['user_id'] = userId;

        return this.verifyPassword(body.password, passwd);
      })
      .then(_ => {
        let currentTime = Math.floor(Date.now() / 1000);

        // create a JWT token
        let tokenData = {
          // audience: JWT's audience
          aud: appConfigs.jwt.audience,

          // data is our user's info
          data: info,

          // expiresIn is how many seconds till this token expires
          exp: currentTime + (60 * appConfigs.jwt.expire),

          // issued at time: the time the token is issued at
          iat: currentTime,

          // the issuer of this token
          iss: appConfigs.jwt.issuer,

          // not before: the token is not good for anytime before this timestamp
          nbf: currentTime,
        };

        let token =  jwt.sign(tokenData, appConfigs.jwt.secret);
        return {
          success: true,
          message: 'success',
          results: token,
        };
      });
  }

  /**
   *
   * @param {string} postPassword
   * @param {string} userPassword
   * @returns {Promise<any>}
   */
  this.verifyPassword = function(postPassword, userPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(postPassword, userPassword, (err, result) => {
        if (result === true) {
          resolve(true);
        }

        if (err) {
          reject({success: false, message: err.message});
        }
        
        reject({success: false, message: 'Invalid Password Combo'});
      });
    });
  };

  /**
   *
   * @param {Object} headers
   * @returns {Promise}
   */
  this.decodeJwt = function(headers) {
    return new Promise((resolve, reject) => {
      if (headers.hasOwnProperty('authorization') === false) {
        reject(new MyError('Access Denied'));
      }

      let jsonToken = headers.authorization;
      jwt.verify(jsonToken, appConfigs.jwt.secret, (error, decoded) => {
        if (error) {
          reject(new MyError('Access Denied'));
        }

        resolve(decoded);
      });
    });
  };
}

module.exports = AuthService;
