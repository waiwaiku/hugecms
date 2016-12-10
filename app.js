var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载配置文件
var config = require('./huge/config');
var router = require('./huge/route');

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

// 初始化
app.use(function(req, res, next) {
    req._config = config;
    req._config.rootPath = __dirname;
    req._config.appPath = path.join(req._config.rootPath, 'huge');

    var md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile() === null) {
        req.isMobile = false;
        req.terminalType = 'pc';
    } else {
        req.isMobile = true;
        req.terminalType = 'mobile';
    }
    next();
});

// 获取路径参数
app.use('/', router);


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
