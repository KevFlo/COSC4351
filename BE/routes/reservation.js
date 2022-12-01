const express = require('express');
const router = express.Router();
const pool = require('../db_client');

// Retrieve tables that are available to be reserved
router.get('/:partySize/:date/:time/:phoneNumber/:name/:email', (req, res) => {
    // Partysize, date, time, name, email ,and phonenumber 
    const {partySize, date, time, phoneNumber, name, email} = req.params;
    const dateTime = date + ' ' + time;
    // Following two tables may be part of the response
    var tables = [];
    var seats = [];
    console.log('Retrieving available tables...');
    console.log(partySize, date, time, phoneNumber, name, email);
    availableTables = `SELECT * FROM tables where table_number NOT IN(
        SELECT table_number FROM reservations WHERE date BETWEEN ADDTIME(?, '-02:00') AND ADDTIME(?, '02:00')
    );`;
    pool.query(availableTables, [dateTime, dateTime], (error, results) => {
        if (error) {
            console.error(error.message);
            return error;
        }
        //console.table(results);
        Object.keys(results).forEach(key => {
            tables.push(results[key].table_number);
            seats.push(results[key].number_seats);
        });
        console.log(tables);
        console.log(seats);
    });
});

// Update the database to reserve the table
router.post('/:partySize/:date/:time/:phoneNumber/:name/:email/:tableNumber', (req, res) => {
    const {partySize, date, time, phoneNumber, name, email, tableNumber} = req.params;
    const dateTime = date + ' ' + time;
    console.log('Creating reservation...');
    console.log(partySize, date, time, phoneNumber, name, email, tableNumber);
    makeReservation = `INSERT INTO reservations (name, phone, email, date, number_guests, table_number)
    VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(makeReservation, [name, phoneNumber, email, dateTime, partySize, tableNumber], (error, results) => {
        if (error) {
            console.error(error.message);
            return error;
        }
        if (results.affectedRows === 1) {
            console.log('Reservation Successful!');
        }
    });
});

module.exports = router;
