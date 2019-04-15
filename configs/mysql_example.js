/**
 * @deprecated
 * 
 * @description Example of MySQL configuration file. This config file is for
 * for a single connection to mysql. The preferred way to connect to a MySQL
 * database is using connection pools.
 * 
 * See the config file pools_example for how use connection pools with MySQL
 * 
 * @type {{host: string, user: string, password: string, database: string}}
 */
module.exports = {
  // TODO: put contents of this file in a new file called 'mysql.js'. **DO NOT COMMIT mysql.js**
  host     : '127.0.0.1',
  port     : 3306,
  user     : 'change_user',
  password : 'change_pass',
  database : 'change_database'
}
