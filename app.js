var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection('reagents').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log("successful");
    console.log(result);
  });
});


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


var myLogger = function (req, res, next) {
  console.log('LOGGED');
  //next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('public'));
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

var cb0 = function (req, res, next) {
  res.send("xxxxx");
  next();
}

var cb1 = function (req, res, next) {
  res.send("yyyy");
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);



app.get('/flights/:from-:to', function(req, res) {
  res.send(req.params);
});

app.use('/', routes);
app.use('/users', users);
//post
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
app.put('/abc', function (req, res) {
  res.send('Got a PUT request');
});
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
