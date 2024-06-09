const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const Page = require('./models/Page');
const User = require('./models/User');
const Auction = require('./models/Auction');
const DBManager = require('./db/DBManager');

const app = express();
const port = 3000;

// Middleware to set custom headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// CONFIG EXPRESS PARA SERVIR DEPENDENCIAS ESTATICAS
app.use('/public', express.static(path.join(__dirname, 'public')));
// CONFIG EXPRESS PARA SERVIR PAGINAS ESTATICAS
app.use('/static', express.static(path.join(__dirname, 'views/static')));

app.get('/static/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/static/home/index.html'));
});
app.get('/static/auction', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/static/auction/index.html'));
});

app.use(bodyParser.urlencoded({ extended: false }));

const dbManager = new DBManager('./database.db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// ROTAS DA APLICAÇÃO
app.get('/', (req, res) => {
    Auction.getAll((auctions) => {
        res.render('home', { title: 'Página Inicial', auctions });
    });
});
app.get('/auction', (req, res) => {
    const id = req.query.id;
    Auction.getById(id, (auction) => {
        res.render('auction', { title: 'Visualizar Anúncio', auction });
    });
});
app.get('/painel', (req, res) => {
    Auction.getAll((auctions) => {
        res.render('painel', { title: 'Painel Administrativo', auctions });
    });
});

app.post('/painel/new-auction', (req, res) => {
    const { titulo, valor, tipo, cooperativa, dataExpiracao, registrationDate, description } = req.body;
    const newAuction = new Auction(null, titulo, parseFloat(valor), tipo, cooperativa, dataExpiracao, registrationDate, description);
    newAuction.save();
    res.redirect('/painel');
});
app.post('/painel/delete-auction', (req, res) => {
    const { id } = req.body;
    Auction.deleteById(id, (err) => {
        if (err) {
            res.status(500).send('Error deleting auction');
        } else {
            res.redirect('/painel');
        }
    });
});

// app.get('/users', (req, res) => {
//     User.getAll((err, users) => {
//         if (err) {
//             res.status(500).send('Error retrieving users');
//         } else {
//             res.json(users);
//         }
//     });
// });

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
