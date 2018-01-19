let bcrypt    = require('bcrypt-nodejs');
let jwt       = require('jsonwebtoken');
let app_configs = require('../configs/jwt.js');

/**
 * @param {Users} user
 */
function AuthService(user)
{
  let parent = this;
  let userInfo = {};

  this.authenticate = function(params)
  {
    return user.getUserByEmail(params.email)
      .then(user =>
      {
        if (user === null) {
          throw {error: 'Incorrect email password combination'};
        }

        userInfo = {...{}, email: user.email, roles: user.roles};

        // verify the password
        return parent.verifyPassword(params.password, user.upassword);
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

        return jwt.sign(tokenData, app_configs.jwt.secret);
      })
      .catch(error =>
      {
        return {'error': error}
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
   * @param {string} jasonToken
   * @returns {Promise<any>}
   */
  this.decodeJwt = function(jasonToken)
  {
    return new Promise((resolve, reject) =>
    {
      jwt.verify(jasonToken, app_configs.jwt.secret, (error, decoded) =>
      {
        if (error) {
          throw {
            error_name: 'Auth Error',
            error_msg : error.message,
          };
        }

        console.log('verified the token');

        resolve(decoded);
      });
    });
  }
}

module.exports = AuthService;
