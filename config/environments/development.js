var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var swig = require('swig');
var compass = require('node-compass');

var routes = require('../routes');

var development = {
  database: {
    brand: 'mongodb',
    name: 'shovel-development',
    baseUrl: 'mongodb://localhost:27017',
    fullUrl: 'mongodb://localhost:27017/shovel-development'
  },

  init: function(app) {
    // view engine setup
    app.set('views', path.join(__dirname, '../../app/views'));
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    swig.setDefaults({ cache: false });

    app.use(express.static(path.join(__dirname, '../../public')));
    app.use('/bower_components',  express.static(__dirname + '/../../bower_components'));
    app.use(compass());

    // uncomment after placing your favicon in /public
    // app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/', routes);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handling
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });

    // production error handler
    // no stacktraces leaked to user
    // app.use(function(err, req, res, next) {
    //   res.status(err.status || 500);
    //   res.render('error', {
    //     message: err.message,
    //     error: {}
    //   });
    // });
  }
};

module.exports = development;