const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db_client');

router.post('/:name/:email/:password/:confirmPassword', (req, res) => {
    const {name, email, password, confirmPassword} = req.params;
    if (password !== confirmPassword) {
        console.error('Error - Passwords do not match!');
        res.send(``)
        return;
    }
    password = crypto.createHash('sha256').update(password).digest('hex');
    // Check to make sure email doesn't already exist
    pool.query(`SELECT * FROM users WHERE email = '${email}';`, (error, results) => {
        if (error) return error;
        if (results.length > 0) {
            console.error('Error - Email already exists!');
            return;
        }
        // name, email, mailingAddress, billingAddress, prefPayment, password
        pool.query(`INSERT INTO users (name, email, password) values ('${name}', '${email}', '${password})';`, (err, result) => {
            if (err) return err;
        });
    })
});

module.exports = router;
