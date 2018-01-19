/**
 * Example config file to hold JWT information
 * @type {{jwt: {audience: string, issuer: string, expire: number, secret: string}}}
 */
module.exports = {
  // TODO: put contents of this file in new file called jwt.js. DO NOT COMMIT jwt.js
  jwt: {
    audience: 'http://example.com',
    issuer: 'http://example.com',
    expire: 60, // minutes to live
    secret: 'MySecretPassPhrase',
  }
}

