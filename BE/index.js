// Libraries used for the Node Express Server
const express = require('express');
const app = express();
const port = 3000;

// Used for parsing JSON to retrieve information from frontend
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Start at index.html
app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname}); // At the moment, this will not work
});

// Routes go here

// Start the express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});