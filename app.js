require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var passport = require('passport');

const {logger} = require('./logs/logEvents');
const errorHandler = require('./logs/errorHandler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var rescuersRouter = require('./routes/rescuers');

var app = express();

app.use(logger);

const whiteList = ['https://www.example.com', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/rescuers', rescuersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

app.all('/*', function(req, res, next) {
  res.status(404).render('404');
});


module.exports = app;
