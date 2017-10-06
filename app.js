var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var index = require('./routes/index');
var login = require('./routes/login');
var ranking = require('./routes/ranking');
var about = require('./routes/about');
var bodyParser = require('body-parser');
var express_validator = require('express-validator');
var knexdb = require('./db.js');
var session = require('express-session');
require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon1.ico')));
app.use(logger('dev'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_validator());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session());
app.use(session({ secret: process.env.COOKIE_SECRET, cookie: { maxAge: 60000 }}));

app.use('/', login);
app.use('/home', index);
app.use('/about', about);
app.use('/ranking', ranking);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error',{ message: 'Nothing to see here...', error : err});
  next(err);
});
//Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.status);
  res.render('error');
});

module.exports = app;
