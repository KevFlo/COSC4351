const express = require('express');
const router = express.Router();
const pool = require('../db_client');

// Retrieve tables that are available to be reserved
router.get('/:partySize/:date/:time/:phoneNumber/:name/:email', (req, res) => {
    // Partysize, date, time, name, email ,and phonenumber 
    const {partySize, date, time, phoneNumber, name, email} = req.params;
    const dateTime = date + ' ' + time;
    console.log('Retrieving available tables...');
    console.log(partySize, date, time, phoneNumber, name, email);
    unavailableTables = "SELECT table_number FROM reservations WHERE date BETWEEN ADDTIME(?, '-02:00') AND ADDTIME(?, '02:00');";
    pool.query(unavailableTables, [dateTime, dateTime], (error, results) => {
        if (error) {
            console.error(error.message);
            return error;
        }
        console.table(results);
        // Still need one more query to show available tables from the tables relation since only unavailable tables are
        // being retrieved right now

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
