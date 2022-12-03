const express = require('express');
const router = express.Router();
const pool = require('../db_client');
const isHighTraffic = require('../modules/high_traffic');

// Retrieve tables that are available to be reserved
router.get('/:partySize/:date/:time/:phoneNumber/:name/:email', (req, res) => {
    // Partysize, date, time, name, email ,and phonenumber 
    // Parameters can probably be shortened to just partySize, date, and time
    const {partySize, date, time, phoneNumber, name, email} = req.params;
    const dateTime = date + ' ' + time;
    // Following two lines check to see if the selected date is a high traffic day (weekend or holiday)
    const newDate = new Date(dateTime);
    const trafficDay = isHighTraffic(newDate);
    // Following two tables may be part of the response
    var tables = [];
    var seats = [];
    console.log('Retrieving available tables...');
    //console.log(partySize, date, time, phoneNumber, name, email);
    availableTables = `SELECT * FROM tables WHERE table_number NOT IN(
        SELECT table_number FROM reservations WHERE date BETWEEN ADDTIME(?, '-02:00') AND ADDTIME(?, '02:00')
    )
    AND number_seats <= ?;`;
    const query = pool.query(availableTables, [dateTime, dateTime, parseInt(partySize) + 1], (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Unable to query the database' });
            return error;
        }
        //console.table(results);
        Object.keys(results).forEach(key => {
            tables.push(results[key].table_number);
            seats.push(results[key].number_seats);
        });
        console.log(tables);
        console.log(seats);
        res.status(200).json({
            tables: tables,
            seats: seats,
            high_traffic: trafficDay
        });
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
            res.status(500).json({ error: 'Unable to query the database' });
            return error;
        }
        if (results.affectedRows === 1) {
            console.log('Reservation Successful!');
            res.status(200);
        }
        else {
            console.log('Error making reservation');
            res.status(500).json({ error: 'Unable to make reservation' });
        }
    });
});

module.exports = router;
