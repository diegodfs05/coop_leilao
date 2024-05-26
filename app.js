const path = require('path');
const Page = require('./models/Page');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const User = require('./models/User');
const DBManager = require('./db/DBManager');

const app = express();
const port = 3000;



// CONFIG EXPRESS PARA SERVIR DEPENDENCIAS ESTATICAS
app.use('/public', express.static(path.join(__dirname, 'public')));
// CONFIG EXPRESS PARA SERVIR PAGINAS ESTATICAS
app.use('/static', express.static(path.join(__dirname, 'views/static')));
// SERVIR HOMEPAGE ESTATICA
app.get('/static/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/static/home/index.html'));
});
// SERVIR HOMEPAGE ESTATICA
app.get('/static/auction', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/static/auction/index.html'));
});






const dbManager = new DBManager('./database.db');

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root URL to /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Define the home route
app.get('/home', (req, res) => {
    // Create a new Page instance
    const page = new Page('Home');
    page.addNavbarItem('Home', '/home');
    page.addNavbarItem('About', '/about');
    page.addNavbarItem('Contact', '/contact');

    // Render the home template with the page details
    res.render('layout', {
        title: page.title,
        navbarItems: page.getNavbar(),
        body: `<%- include('home') %>`
    });
});


// Init user table
User.createTable();


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
    dbManager.db.all('SELECT * From my_table', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log("App running at http://localhost:" + port);
});