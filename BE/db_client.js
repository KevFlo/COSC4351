const mysql = require('mysql');
const creds = require('./creds.json');

const pool = mysql.createPool(creds);

module.exports = pool;
