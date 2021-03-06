// Import Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./controllers/routes');
const dotenv = require('dotenv-safe');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');

// Initialize process.env from .env file
// for development
if (!process.env.ENV_HEROKU) dotenv.config();
// Express Port/App Declaration

const PORT = process.env.PORT || 3001;
const app = express();
// Middleware

// Helmet will enforce HTTPS and enable other logical security measures
// TODO: Uncomment helmet and test application/api/auth
// app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use cookies (required for auth)
app.use(cookieParser());
// required for passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
})); // session secret

require('./config/passport.js')(passport); // pass passport for configuration

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const staticDirectory = (process.env.ENV_HEROKU) ? `${__dirname}/../react-ui/build/` : `${__dirname}/../public/`;
app.use(express.static(path.resolve(staticDirectory)));

// Initialize routes
routes(app, passport);

// Setup Mongo/Mongoose and add promise model
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/gig-aware';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Save mongoose default connection
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Database Error:', error);
});

// Connect to database and set the app to listen on port 3000
db.once('open', () => {
  console.log('Connected to database');

  app.listen(PORT, () => {
    console.log('App running on port', PORT);
  });
});
