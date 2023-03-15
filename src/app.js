var express = require('express');
var path = require('path');

const methodOverride = require('method-override')
const session = require("express-session")
const cookieParser = require("cookie-parser")


var app = express();



app.use(session({
  secret: "Mensaje ultrasecreto",
  resave: false,
  saveUninitialized: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs')

app.set('views', 'src/views')

let usersRouter = require('./routes/index');
let usersApiRoute = require('./routes/api/userApi')

app.use('/', usersRouter);
app.use('/api/users', usersApiRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
