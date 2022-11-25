const mysql = require('mysql');
const creds = require('./creds.json');
var reservation_count, table_count;
var num_guests = [];
var table_num = [];
var capacity = [];
var accomodated_table = [];

// Connection details provided by creds.json
const connection = mysql.createConnection(creds);

// Connect to the database
connection.connect();

// First, get number of guests and row count to determine which tables can accomdate the number of guests
connection.query(`SELECT number_guests FROM reservations;`, (error, results, fields) => {
    if (error) throw error;
    reservation_count = results.length;
    for (i = 0; i < reservation_count; i++) {
        num_guests.push(results[i].number_guests);
    }
    console.log(num_guests);
});

// Next, retrieve each table number and its capacity
connection.query(`SELECT * FROM tables;`, (error, results, fields) => {
    if (error) throw error;
    table_count = results.length;
    for (i = 0; i < table_count; i++) {
        table_num.push(results[i].table_number);
        capacity.push(results[i].number_seats);
    }
    console.log(table_num);
    console.log(capacity);

    // For each row in the reservations table, assign a table that can accommodate the number of guests
    for (i = 0; i < reservation_count; i++) {
        var ideal_capacity
        var candidate_table;
        // Determine an ideal capacity so that there aren't any situations where entries with one guest reserving a table for 8
        // or similar
        if (num_guests[i] > 6) {
            ideal_capacity = 8;
        }
        else if (num_guests[i] > 4) {
            ideal_capacity = 6;
        }
        else if (num_guests[i] > 2) {
            ideal_capacity = 4;
        }
        else {
            ideal_capacity = 2;
        }
        // Use this so that it won't always assign the first table that can accommodate the guests
        randomness_factor = Math.floor(Math.random() * 10);
        for (j = 0; j < table_count; j++) {
            // Assign the table if 
            if (ideal_capacity === capacity[j]) {
                candidate_table = table_num[j];
                if (randomness_factor <= 0 || j >= table_count - 1) {
                    accomodated_table[i] = candidate_table;
                    break;
                }
                randomness_factor--;
            }  
        }
    }
    console.dir(accomodated_table, {'maxArrayLength':null});
});

var emails = []

// Use email to update each row in the table
connection.query(`SELECT email FROM reservations;`, (error, results) => {
    if (error) throw error;
    
    for (i = 0; i < results.length; i++) {
        emails.push(results[i].email);        
    }
    //console.log(emails);
    // Update the tables
    for (i = 0; i < reservation_count; i++) {
        /*connection.query(`UPDATE reservations SET table_number = ${accomodated_table[i]} WHERE email = '${emails[i]}';`, (error, results) => {
            if (error) {
                throw error;
            }
        });*/
        console.log(`UPDATE reservations SET table_number = ${accomodated_table[i]} WHERE email = '${emails[i]}';`);
    }
});

// Close connection when finished
connection.end();
