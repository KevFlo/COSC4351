const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db_client');

router.get('/:email/:password', (req, res) => {
    const {email, password} = req.params;
    console.log(email);
    console.log(password);
    // Hash the password before checking the db since the db will store hashed passwords for security
    hash = crypto.createHash('sha256').update(password).digest('hex');
    sql = 'SELECT email FROM users WHERE email = ? OR password = ?;';
    pool.query(sql, [email, hash], (error, results) => {
        if (error) {
            console.error(error.message); 
            return error;
        }
        if (results.length === 1) {
            console.log('Successful Login!');
        }
        else {
            console.log('Incorrect Login! Please try again!');
        }
    });
});

module.exports = router;
