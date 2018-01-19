let mysql     = require('mysql');
let bcrypt    = require('bcrypt-nodejs');
let configs   = require('../configs/mysql');
const uuidv4  = require('uuid/v4');

/**
 * This constructor function is responsible for running queries against
 * the mysql database
 */
function Users()
{
  let c_date = new Date();
  console.log('creating user model ', c_date.getTime());

  // These are PRIVATE variables, they can only be accessed within this class
  let mysql_connection = null;

  this.getUserBy = function(param)
  {
    if (param.hasOwnProperty('email')) {
      return this.getUserByEmail(param.email);
    }

    if (param.hasOwnProperty('id')) {
      return this.getUserById(param.id);
    }

    return new Promise((resolve, reject) => {
      reject({user_id: null, message: 'No user found'});
    })
  }

  this.getUser = function(sql, params)
  {
    let parent = this;

    console.log('sql', sql);
    console.log('params', params);

    mysql_connection = mysql.createConnection(configs);

    return this.mysqlConnect()
      .then((connectionId) =>
      {
        console.log(`getUser: connection id: ${connectionId}`);
        return parent.runQuery(sql, params);
      })
      .then((results) =>
      {
        mysql_connection.end((err) => {
          if (err) {
            console.log('error terminating connection: ', mysql_connection.threadId);
            console.log('error ', err);
          }
        });

        if (results.resultSet.length === 0) {
          console.log('no user found (0) ');
          return null;
        }

        let resultSet = results.resultSet[0];

        // return our result to the calling method.
        return (resultSet);
      })
      .catch(error => {
        throw error;
      });
  }

  this.getUserByEmail = function(email)
  {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, '
      + 'birthday, roles FROM users WHERE email = ?';

    return this.getUser(sql, [email]);
  }

  this.getUserById = function(id)
  {
    let sql = 'SELECT user_id, first_name, last_name, upassword, email, '
    + 'birthday, roles FROM users WHERE user_id = ?';

    return this.getUser(sql, [id]);
  }

  /**
   * Inserts a user into the database
   */
  this.addUser = function(postParams)
  {
    let parent = this;

    let insertValues = [
      uuidv4(),
      postParams.firstName,
      postParams.lastName,
      bcrypt.hashSync(postParams.password),
      postParams.email,
      postParams.birthday,
      postParams.currentTime,
    ];

    // get a connection to the database
    mysql_connection = mysql.createConnection(configs);

    // use promises to handle all callbacks.
    return parent.mysqlConnect()
      .then((connectionId) =>
      {
        console.log(`connected to database: thread id ${connectionId}`);

        return parent.isEmailUnique(postParams.email)
      })
      .then((emailResults) =>
      {
        let found = emailResults.resultSet[0].found;
        if (found) {
          throw 'user already registered';
        }

        return parent.isUuidUnique(insertValues[0]);
      })
      .then(uuidResults =>
      {
        let found = uuidResults.resultSet[0].found;
        if (found) {
          throw 'invalid user ID';
        }

        // create our insert query & insert array
        let sql = 'INSERT INTO USERS (user_id, first_name, last_name, '
        + 'upassword, email, birthday, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';

        return parent.runQuery(sql, insertValues);
      })
      .then(results =>
      {
        mysql_connection.end((err) => {
          if (err) {
            console.log('error terminating connection: ', mysql_connection.threadId);
            console.log('error ', err);
          }
        });

        // return an object to our calling method:
        return ({success: 'success', user_id: insertValues[0]});
      })
      .catch(error => {
        mysql_connection.end((err) => {
          if (err) {
            console.log('error terminating connection: ', mysql_connection.threadId);
            console.log('error ', err);
          }
        });

        throw error;
      })
  }

  this.isEmailUnique = function(email)
  {
    let sql = 'SELECT COUNT(*) AS found FROM users WHERE email = ?';

    return this.runQuery(sql, [email]);
  }

  this.isUuidUnique = function(uuid)
  {
    let sql  = 'SELECT COUNT(*) AS found FROM users WHERE user_id = ?';

    return this.runQuery(sql, [uuid]);
  }

  /**
   * Run this method when trying to connect to the database
   * @param Object error
   * @return Promise
   */
  this.mysqlConnect = function()
  {
    return new Promise(function(resolve, reject)
    {
      mysql_connection.connect(function(error)
      {
        if (error) {
          console.log('Error making connection', error);

          reject("Failed connection to database");
        }

        // we don't have to return anything, this is just to show that Promises
        // can return
        resolve(mysql_connection.threadId);
      });
    });
  }

  /**
   * use this method for running selects
   * @param string query - well formed query
   * @return Promise
   */
  this.runQuery = function(query, params)
  {
    return new Promise(function(resolve, reject)
    {
      mysql_connection.query(query, params, function(error, results, fields)
      {
        if (error) {
          console.log('error running query', error);
          reject(error);
        }

        // console.log('success running query [fields]', fields);
        // console.log('success running query [results]', results);
        resolve({resultSet: results, fieldSet: fields});
      });

    });
  }
}

module.exports =  Users;
