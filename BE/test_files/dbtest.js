const mysql = require('mysql');
const creds = require('./creds.json');

// Connection details provided by creds.json
const connection = mysql.createConnection(creds);

// Connect to the database
connection.connect();

// Run query and display results
connection.query('SELECT * FROM users;', (error, results, fields) => {
    if(error) throw error;
    console.table(results);
});

// Close connection when finished
connection.end();
