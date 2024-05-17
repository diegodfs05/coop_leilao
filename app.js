const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('.database.db');

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