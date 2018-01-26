let bcrypt    = require('bcrypt-nodejs');
let jwt       = require('jsonwebtoken');
let app_configs = require('../configs/jwt.js');

/**
 * @param {Users} user
 */
function AuthService(user)
{

  this.authenticate = function(params)
  {
    let userInfo = {};

    return user.getUserByEmail(params.email)
      .then(result =>
      {
        let user  = result.results[0];

        if (result.success === false) {
          return {
            message: 'Incorrect email password combination',
            success: false,
          };
        }

        userInfo.email = user.email;
        userInfo.user_id = user.user_id;

        // verify the password
        return this.verifyPassword(params.password, user.upassword);
      })
      .then(matched =>
      {
        if (matched === false) {
          throw {error: 'Invalid email, or wrong password'};
        }

        let currentTime = Math.floor(Date.now() / 1000);

        // start building a JWT
        let tokenData = {
          // audience: JWT's audience
          aud: app_configs.jwt.audience,

          // data is our user's info
          data: userInfo,

          // expiresIn is how many seconds till this token expires
          exp: currentTime + (60 * app_configs.jwt.expire),

          // issued at time: the time the token is issued at
          iat: currentTime,

          // the issuer of this token
          iss: app_configs.jwt.issuer,

          // not before: the token is not good for anytime before this timestamp
          nbf: currentTime,
        };

        let token =  jwt.sign(tokenData, app_configs.jwt.secret);

        return {
          success: true,
          message: 'success',
          results: token,
        };
      })
      .catch(error =>
      {
        return error;
      })
  }

  /**
   *
   * @param {string} postPassword
   * @param {string} userPassword
   * @returns {Promise<any>}
   */
  this.verifyPassword = function(postPassword, userPassword)
  {
    console.log('postPassword:', postPassword);
    console.log('userPassword:', userPassword);

    return new Promise((resolve, reject) =>
    {
      bcrypt.compare(postPassword, userPassword, (err, result) => {
        if (result === true) {
          resolve(true);
        }

        resolve(false);
      });
    });
  }

  /**
   *
   * @param {Object} headers
   * @returns {Promise<any>}
   */
  this.decodeJwt = function(headers)
  {
    return new Promise((resolve, reject) =>
    {
      if (headers.hasOwnProperty('authorization') === false) {
        reject({
          success: false,
          message: 'Access Denied',
        });
      }

      let jsonToken = headers.authorization;
      jwt.verify(jsonToken, app_configs.jwt.secret, (error, decoded) =>
      {
        if (error) {
          reject({
            success: false,
            message: 'Access Denied',
          });
        }

        resolve(decoded);
      });
    });
  }
}

module.exports = AuthService;
