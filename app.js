var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var leftRouter = require('./routes/left');
var rightRouter = require('./routes/right');
var logoutRouter = require('./routes/logout');

var bookRouter = require('./routes/book');
var addbookRouter = require('./routes/addbook');
var searchbookRouter = require('./routes/searchbook');
var deletebookRouter = require('./routes/deletebook');
var editbookRouter = require('./routes/editbook');

var userRouter = require('./routes/user');
var adduserRouter = require('./routes/adduser');
var searchuserRouter = require('./routes/searchuser');
var deleteuserRouter = require('./routes/deleteuser');
var edituserRouter = require('./routes/edituser');

var financeRouter = require('./routes/finance');
var addfinanceRouter = require('./routes/addfinance');
var searchfinanceRouter = require('./routes/searchfinance');
var cancelfinanceRouter = require('./routes/cancelfinance');
var payfinanceRouter = require('./routes/payfinance');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}));



// 首页
app.use('/admin', indexRouter);
// 退出登录
app.use('/logout', logoutRouter);
// 左侧导航
app.use('/left', leftRouter);
// 右侧内容
app.use('/right', rightRouter);

// 书籍页面
app.use('/book', bookRouter);
// 添加书籍
app.use('/addbook', addbookRouter);
// 搜索书籍
app.use('/searchbook', searchbookRouter);
// 删除书籍
app.use('/deletebook', deletebookRouter);
// 编辑书籍
app.use('/editbook', editbookRouter);

// 用户页面
app.use('/user', userRouter);
// 添加用户
app.use('/adduser', adduserRouter);
// 搜索用户
app.use('/searchuser', searchuserRouter);
// 删除用户
app.use('/deleteuser', deleteuserRouter);
// 编辑用户
app.use('/edituser', edituserRouter);

// 财务页面
app.use('/finance', financeRouter);
// 添加账单
app.use('/addfinance', addfinanceRouter);
// 搜索账单
app.use('/searchfinance', searchfinanceRouter);
// 取消账单
app.use('/cancelfinance', cancelfinanceRouter);
// 支付账单
app.use('/payfinance', payfinanceRouter);



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
  res.render('error', { title: 'Error', message: err.message, error: err });
});


module.exports = app;
