// Libraries used for the Node Express Server
const express = require('express');
const app = express();
const port = 8080;

// Used for parsing JSON to retrieve information from frontend
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Routes go here
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

const reservationRouter = require('./routes/reservation');
app.use('/reservation', reservationRouter);


// Start the express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
