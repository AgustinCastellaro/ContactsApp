const express = require('express');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./database/keys');
const passport = require('passport');
const flash = require('connect-flash');
const port = 3000;

const indexRoute = require('./routes/index.routes');
const registerRoute = require('./routes/register.routes');
const loginRoute = require('./routes/login.routes');
const logoutRoute = require('./routes/logout.routes');
const listRoute = require('./routes/list.routes');
const contactsRoute = require('./routes/contacts.routes');

const sessionStore = new MySQLStore(database)

// Initializations
const app = express();
require('./lib/passport');

// Middlewares
app.use(session({
    key: 'userCookie',
    secret: 'contactsApp',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});


// Routes
app.use('/', indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/list', listRoute);
app.use('/contacts', contactsRoute);

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Listen port
app.listen(port, () => 
    console.log(`ContactsApp listening on port ${port}!`)
)

