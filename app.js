/**
 * Include dotEnv config
 */
require('dotenv').config();

/**
 * Vendor modules
 *
 * @type {createError}
 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');
let session = require('express-session');
let passport = require('passport')

/**
 * Includes routers
 */
let webRouter = require('./routes/web');
let adminRouter = require('./routes/admin');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('dhjdhidjsjsnjsnnsiisiijnknsnisninsisjnsjnj'));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(require('./middlewares/auth'));
app.use(require('./middlewares/cart'));

/**
 * Routing prefix
 */
app.use('/', webRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errors/error');
});

module.exports = app;
