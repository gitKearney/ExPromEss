// if using connection pools

// TODO: put contents of this file in a new file called 'pools.js'. **DO NOT COMMIT pools.js**

let mysql   = require('mysql');
let pool   = mysql.createPool({
  connectionLimit : 28,
  host            : '127.0.0.1',
  user            : 'db_user',
  password        : 'password',
  database        : 'db_name'
});

module.exports.pool = pool;