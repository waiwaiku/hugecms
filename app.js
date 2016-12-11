/*jshint esversion: 6 */
// 设置应用名称
const appName = 'huge';

var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载配置文件
var config = require(`./${appName}/config`);
// 加载路由文件
var route = require(`./${appName}/route`);
// 终端判断模块
var MobileDetect = require("mobile-detect");

const appPath = path.join(__dirname, appName);
var moduleList = {};
fs.readdir(appPath, (err, files) => {
    var fn = function (filename) {
        var filepath = path.join(appPath, filename);
        fs.stat(filepath, (err, stats) => {
            if(stats.isDirectory()) {
                moduleList[filename] = {controller: []};
                // console.log(path.join(filepath, 'controller'));
                fs.readdir(path.join(filepath, 'controller'), (err, files) => {
                    // console.log(files, filename);
                    moduleList[filename].controller = files;
                });
            }
        });
    };
    for (let i = 0; i < files.length; i++) {
        if(config.disableModule.indexOf(files[i]) === -1) fn(files[i]);
        else continue;
    }
});

var app = express();

app.set("x-powered-by", false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/file', express.static(path.join(__dirname, 'upload')));

// 初始化
app.use((req, res, next) => {
    req._config = config;
    req._rootPath = __dirname;
    req._appPath = appPath;
    req._allowModules = moduleList;

    // console.log(moduleList);

    var md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile() === null) {
        req._isMobile = false;
        req._terminalType = 'pc';
    } else {
        req._isMobile = true;
        req._terminalType = 'mobile';
    }
    next();
});

// 获取路径参数
app.use('/', route);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
