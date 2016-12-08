var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载配置文件
var config = require('./config/common');
var home = require('./routes/home');
// var admin = require('./routes/admin');
// var users = require('./routes/users');

var MobileDetect = require("mobile-detect");

var app = express();

app.set("x-powered-by", false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.config = config;
    req.config.root_path = __dirname;
    console.log(__dirname);
    var md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile() === null) {
        req.is_mobile = false;
        req.terminal_type = 'pc';
    } else {
        req.is_mobile = true;
        req.terminal_type = 'mobile';
    }
    next();
});
// app.use('/admin', admin);
// app.use('/users', users);
app.use('/', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
