const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const User = require('./models/User');
const DBManager = require('./db/DBManager');


const app = express();
const port = 3000;

const db = new sqlite3.Database('.database.db');

// Example usage of the User class
app.get('/create-user', (req, res) => {
    const user = new User(null, 'Jane Doe', 'jane.doe@example.com');
    user.save();
    res.send('User created');
});

/*
// Example usage of the User class
app.get('/user', (req, res) => {
    const user = new User(1, 'John Doe', 'john.doe@example.com');
    res.send(user.displayInfo());
});
*/

app.get('/users', (req, res) => {
    User.getAll((err, users) => {
        if (err) {
            res.status(500).send('Error retrieving users');
        } else {
            res.json(users);
        }
    });
});

//Endpoint to get data
app.get('/data', (req, res) => {
    db.all('SELECT * From my_table', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log("App running at http://localhost:" + port);
});