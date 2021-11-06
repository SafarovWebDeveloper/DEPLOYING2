var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const expressValidator = require("express-validator");
const passport = require("passport");
const r_Index = require('./routes/index');
const r_Add = require('./routes/add');
const r_User = require('./routes/user');
const dbConnect = require('./bich/db')
const mongoose = require('mongoose')


var app = express();

app.use(require("connect-flash")());
app.use(function (req, res, next) {
    res.locals.messages = require("express-messages")(req, res);
    next();
});

// ============= Settings session ================


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));

// =============== express-validator ===================

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      let nameSpace = param.split(".");
      root = nameSpace.shift();
      formParam = root;

      while (nameSpace.length) {
          formParam += "[" + nameSpace.shift() + "]";
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      }
  }
}));

// mongoose settings
mongoose.connect(dbConnect.db);

const db = mongoose.connection;
db.on('open', () => {
    console.log('mongoose running http://localhost:3000')
});

db.on('error', (err) => {
    console.log(err, 'monogose error');
});




// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
require("./pass/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.get("*", (req, res, next) => {
    res.locals.user = req.user || null
    next();
});

// passport use

app.use(r_Index);
app.use(r_Add);
app.use(r_User);

// public settings
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));



module.exports = app;
