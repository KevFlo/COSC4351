const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post('/:name/:email/:password/:confirmPassword', (req, res) => {
    const {name, email, password, confirmPassword} = req.params;
    if (password !== confirmPassword) {
        console.error('Error - Passwords do not match!');
        res.send(``)
        return;
    }
    password = crypto.createHash('sha256').update(password).digest('hex');
    const pool = require('../db_client');
    // Check to make sure email doesn't already exist
    // Note, none of these queries will work right now due to no password field in the db
    pool.query(`SELECT * FROM users WHERE email = '${email}';`, (error, results) => {
        if (error) return error;
        if (results.length > 0) {
            console.error('Error - Email already exists!');
            pool.end();
            return;
        }
        pool.query(`INSERT INTO users (name, email, password) values ('${name}', '${email}', '${password})';`, (err, result) => {
            if (err) return err;
        });
    })

    pool.end();
});

module.exports = router;
