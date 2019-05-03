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
    // for an excellent secret, run this command: head /dev/urandom | uuencode -m - | sed -n 2p | cut -c1-${1:-32}
    // it returns a random 32 character string
  },
  // for testing if you don't want to have auth, you can turn it off
  disable_auth: false,
}

