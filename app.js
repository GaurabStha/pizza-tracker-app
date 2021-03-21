const express = require('express');
const Handlebars = require('handlebars');
var exhbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path');
const PORT = process.env.port || 3300;

const app = express();

app.get('/', (req, res) => {
    res.render('index');
});

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', exhbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: __dirname + '/views/layouts',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.listen(PORT, () => {
    console.log(`The server is running at ${PORT}.`);
});