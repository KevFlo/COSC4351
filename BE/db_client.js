const mysql = require('mysql');
const creds = require('./creds');


const pool = mysql.createPool(creds);

module.exports = pool;
