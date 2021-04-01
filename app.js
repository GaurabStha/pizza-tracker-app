require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const PORT = process.env.port || 4000;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const app = express();

// Database connection
mongoose.connect('mongodb://localhost/pizza-tracker', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected....');
}).catch(() => {
    console.log('Connection failed.')
});

// Session Store
let mongoStore = new MongoStore({
    mongoUrl: 'mongodb://localhost/pizza-tracker',
    mongooseConnection: connection,
    collection: 'sessions'
});

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set for the static file or assets
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`The server is running at ${PORT}.`);
});