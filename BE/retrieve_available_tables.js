const mysql = require('mysql');
const creds = require('./creds.json');
var date = '2022-12-02 17:49:05';

// Connection details provided by creds.json
const connection = mysql.createConnection(creds);

// Connect to the database
connection.connect();

// Run query to see which tables are unavailable depending on the chosen time and display results
q = `SELECT table_number FROM reservations WHERE date BETWEEN ADDTIME('${date}', '-02:00') AND ADDTIME('${date}', '2:00');`
console.log(q);
connection.query(q, (error, results, fields) => {
    if(error) throw error;
    console.table(results);
});

// Close connection when finished
connection.end();
