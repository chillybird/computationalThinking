var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs=require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listRouter = require('./routes/list')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// 更改为html引擎驱动
app.engine('html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 拦截未登录用户
app.use(function(req,res,next){
  console.log(`请求的地址是:${req.originalUrl}`);
  if(req.cookies.userId){
    next();
  }else{
    // 当请求的接口为/users/login /users/regist users/logOut 时允许操作，对其他接口进行拦截
    if(req.path == '/users/info' || req.path == '/users/login' || req.path == '/users/regist' || req.path == '/users/logOut' ||   req.path == '/list/plist'){
      next();
    }else{
      res.json({
        status:'1001',
        msg:'用户未登录',
        result:''
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/list',listRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
