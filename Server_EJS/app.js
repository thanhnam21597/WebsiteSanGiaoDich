// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const axios = require('axios');
const CronJob = require('cron').CronJob;
const bodyParser = require('body-parser');

//Khai báo route
var indexRouter = require('./routes/index');
var heThongRouter = require('./routes/HeThong');

var app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'DELETE,PUT,GET,POST');
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept ");
  next();
})
// view engine setup sử dụng Ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sử dụng router
app.use('/', indexRouter);
app.use('/api', heThongRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const jobPingServer = new CronJob('0 */27 * * * *', async () => {
//   const pingServer = await axios({
//     method: 'get',
//     url: 'https://websangiaodichcoin-api.herokuapp.com/',
//   });
//   const pingClient = await axios({
//     method: 'get',
//     url: 'https://sangiaodichonline.herokuapp.com/',
//   })
// },null,true, 'Asia/Ho_Chi_Minh');
// jobPingServer.start();

module.exports = app;
