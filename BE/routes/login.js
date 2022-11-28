const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/:email/:password', async (req, res) => {
    const pool = require('../db_client')
    const {email, password} = req.params;
    console.log(email);
    console.log(password);
    // Hash the password before checking the db since the db will store hashed passwords for security
    hash = crypto.createHash('sha256').update(password).digest('hex');
    pool.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${hash}';`, (error, results) => {
        if (error) return error;
        console.table(results);
    });
    pool.end();
});

module.exports = router;
