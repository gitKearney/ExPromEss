const credentials = require('../configs/db.example');
const mysql = require('mysql');

const pool = mysql.createPool(credentials);

module.exports = pool;
