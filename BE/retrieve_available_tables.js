const mysql = require('mysql');
const creds = require('./creds.json');
var date;

// Connection details provided by creds.json
const connection = mysql.createConnection(creds);

// Connect to the database
connection.connect();

/*/ Run query and display results WIP
connection.query(`SELECT table_number FROM reservations WHERE date BETWEEN '${date}' AND ADDTIME('${date}', '-02:00');`, (error, results, fields) => {
    if(error) throw error;
    console.table(results);
});*/

// Close connection when finished
connection.end();
