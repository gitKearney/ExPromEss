let bcrypt      = require('bcrypt-nodejs');
let jwt         = require('jsonwebtoken');
let appConfigs  = require('../configs/jwt.example');

function AuthService(user) {
  const info = { email: '', user_id: '', };

  this.authenticate = function(body) {
    if (!Object.prototype.hasOwnProperty.call(body, 'password') ||
        !Object.prototype.hasOwnProperty.call(body, 'email'))
    {
      throw new Error('BAD REQUEST');
    }

    return user.getUserByEmail(body.email)
      .then((rdp) => {
        const email = rdp[0]['email'];
        const passwd = rdp[0]['upassword'];
        const userId = rdp[0]['user_id'];

        info['email'] = email;
        info['user_id'] = userId;

        return this.verifyPassword(body.password, passwd);
      })
      .then(() => {
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
  };

  this.verifyPassword = function(postPassword, userPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(postPassword, userPassword, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          resolve(true);
          return;
        }

        reject(new Error('Invalid Password Combo'));
      });
    });
  };

  this.decodeJwt = function(headers) {
    return new Promise((resolve, reject) => {
      if (!Object.prototype.hasOwnProperty.call(headers,'authorization')) {
        reject(new Error('Access Denied'));
        return;
      }

      let jsonToken = headers.authorization;
      jwt.verify(jsonToken, appConfigs.jwt.secret, (error, decoded) => {
        if (error) {
          reject(new Error('Access Denied'));
          return;
        }

        resolve(decoded);
      });
    });
  };
}

module.exports = AuthService;
