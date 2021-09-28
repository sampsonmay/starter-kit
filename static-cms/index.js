const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');

// Set a path
const path = require('path')

// Application settings
const app = express()
const port = process.env.PORT || 3000

// Configuration
const config = require('./config')(app)

// Static files
app.use(express.static(path.join(__dirname, 'static')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Set the template engine
app.use(expressLayouts)
app.set('layout', 'layouts/master')
app.set('view engine', 'ejs')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
app.get('/', require('./routes/site'))
app.get('/:page', require('./routes/site'))

// API Routing
app.post('/:page/update', require('./routes/update'));
app.post('/:page/settings', require('./routes/settings'));
app.post('/:page/build', require('./routes/build'));

app.get('*', require('./routes/site'))

// Listen
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});