var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use('/',indexRouter);
app.use('/users',usersRouter);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());  // express 쓸 수 있게 해줌
app.use(express.urlencoded({ extended: false })); // url encode해줌
app.use(cookieParser());  // cookie를 파싱하고 그걸 바로 쓸 수 있게 해줌
app.use(express.static(path.join(__dirname, 'public')));  // 정적파일 응답. public에 뭔갈 만들어주면 거기내에 있는걸 경로로 바로 쓸 수 있어짐. 
  // 요청한게 있으면 res주고 next하지않음.

function aaa(){
  console.log("aaa called")
  return (req,res,next)=>{
    console.log(`req.url=${req.url}`);
    next();
  }
}
app.use(aaa());

// // 범용 미들웨어
// app.use((req,res,next)=>{
//   console.log(`req.url=${req.url}`);
//   next(); // 다음 미들웨어를 호출하는 함수. 이거 없으면 응답만 넣고 계속 기다리는 상태가됨 (무한 로딩)
// })
// 응답하는 미들웨어는 next를 호출할 필요가없음 (얘를 더이상 받아줄 실행 경로가 없어짐)
// 이게 실행이 되지만 `/`와 url이 일치하지 않으므로 실행되지않음
//
// app.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: 'abc',
//   cookie: {
//     httpOnly: true,
//     secure: false
//   },
//   name : 'session-cookie'
// }));

// app.get('/', (req,res)=>{
//   console.log('/ called..');
//   req.session.name = 'test';
//   res.send('Hello client!');
// });

// app.get('/user/:seq',(req,res)=>{
//   console.log('/users called..');
//   console.log(req.params.id);
//   res.send('This is users!');
// });
//
// app.get('/users', (req,res)=>{
//   console.log('/users called..');
//   res.send('users');
// });

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
