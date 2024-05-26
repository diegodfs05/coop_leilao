const express = require('express');
const path = require('path');
const Page = require('./models/Page');
const app = express();
const port = 3000;

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

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

                            app.listen(port, () => {
                              console.log(`App running at http://localhost:${port}`);
                              });
