const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db_client');

router.post('/:name/:email/:password/:password2/:mailingAddress/:billingAddress/:prefPayment', (req, res) => {
    const {name, email, password, password2, mailingAddress, billingAddress, prefPayment} = req.params;
    console.log(name, email, password, password2, mailingAddress, billingAddress, prefPayment);
    // Confirm passwords match
    if (password !== password2) {
        console.error('Error - Passwords do not match!');
        res.status(200).json({ error: 'Passwords do not match' });
        return;
    }
    // Note, should be changed so that the frontend hashes the password instead of doing it here
    hash = crypto.createHash('sha256').update(password).digest('hex');
    // Check to make sure email doesn't already exist
    checkEmail = 'SELECT email FROM users WHERE email = ?;';
    pool.query(checkEmail, [email], (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500);
            return error;
        }
        if (results.length > 0) {
            console.error('Error - Email already exists!');
            res.status(200).json({ error: 'Email already exists!' });
            return;
        }
        // name, email, mailingAddress, billingAddress, prefPayment, password
        createUser = `INSERT INTO users (preferred_diner, email, password, name, mailing_address, billing_address,
        points, preferred_payment) values (UUID(), ?, ?, ?, ?, ?, 0, ?);`
        pool.query(createUser, [email, hash, name, mailingAddress, billingAddress, prefPayment], (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(500);
                return err;
            }
            if (result.affectedRows === 1) {
                console.log('New user successfully created!');
                res.status(200).json({
                    name: name,
                    email: email
                });
            }
            else {
                console.log('Error creating user!');
                res.status(500).json({ error: 'Error creating user' });
            }
        });
    });
});

module.exports = router;
