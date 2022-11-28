const express = require('express');
const router = express.Router();
const pool = require('../db_client');

router.get('/:partySize/:date/:time/:phoneNumber', (req, res) => {
    // Partysize, date, time, name, email ,and phonenumber 
    const {partySize, date, time, phoneNumber} = req.params;
    console.log(partySize);
    console.log(date);
    console.log(time);
    console.log(phoneNumber);
});

module.exports = router;
