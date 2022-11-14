const mysql = require('mysql');
const creds = require('./creds.json');
const connection = mysql.createConnection(creds);

connection.connect((err) => {
    if(err) {
        console.error(err);
        return;
    }
});

connection.query('SELECT * FROM users;', (error, results, fields) => {
    if(error) throw error;
    console.table(results);
})

connection.end();