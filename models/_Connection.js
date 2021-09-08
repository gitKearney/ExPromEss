// TODO: use db.js
const credentials = require('../configs/db');
const mysql = require('mysql');

const pool = mysql.createPool(credentials);

module.exports = pool;
