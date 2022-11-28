const mysql = require('mysql');
const crypto = require('crypto');
const creds = require('./creds.json');

// Connection details provided by creds.json
const connection = mysql.createConnection(creds);

// Connect to the database
connection.connect();

connection.query(`SELECT password FROM users;`, (error, results) => {
    if (error) throw error;
    for (i = 0; i < results.length; i++)
    {
        hash = crypto.createHash('sha256').update(results[i].password).digest('hex');
        console.log(`UPDATE users SET password = '${hash}' WHERE password = '${results[i].password}';`)
    }
});

connection.end();
