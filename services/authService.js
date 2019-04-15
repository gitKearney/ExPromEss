let bcrypt      = require('bcrypt-nodejs');
let jwt         = require('jsonwebtoken');
let appConfigs = require('../configs/jwt.js');

/**
 * @param {Users} user
 */
function AuthService(user) {
  this.authenticate = function(params) {
    let userInfo = {};
    let userRes = {};

    let checkBody = new Promise((resolve, reject) => {
      if (!params.hasOwnProperty('password') || !params.hasOwnProperty('email')) {
        reject({ success: false, message: 'Invalid body', });
      }

      resolve(true);
    });

    return checkBody
      .then(() => {
        return user.getUserByEmail(params.email);
      })
      .then(result => {
        if (result.success === false) {
          throw {
            message: 'Incorrect email password combination',
            success: false,
          };
        }

        userRes = result.results[0];
        userInfo.email = userRes.email;
        userInfo.user_id = userRes.user_id;

        // verify the password
        return this.verifyPassword(params.password, userRes.upassword);
      })
      .then(() => {
        let currentTime = Math.floor(Date.now() / 1000);

        // start building a JWT
        let tokenData = {
        // audience: JWT's audience
          aud: appConfigs.jwt.audience,

          // data is our user's info
          data: userInfo,

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
          results: {
            token: token,
            email: userRes.email,
            firstName: userRes.first_name,
            lastName: userRes.last_name,
            userNumber: userRes.user_id,
          },
        };
      })
      .catch(error => {
        return error;
      });
  };

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

        reject({ success: false, message: 'Invalid Password Combo', });
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
        reject({
          success: false,
          message: 'Access Denied',
        });
      }

      let jsonToken = headers.authorization;
      jwt.verify(jsonToken, appConfigs.jwt.secret, (error, decoded) => {
        if (error) {
          reject({
            success: false,
            message: 'Access Denied',
          });
        }

        resolve(decoded);
      });
    });
  };
}

module.exports = AuthService;
