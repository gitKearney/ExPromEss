const credentials = require('../configs/db.example');
const mysql = require('mysql');

/** @type {Pool} */
const pool = mysql.createPool(credentials);

module.exports = pool;
