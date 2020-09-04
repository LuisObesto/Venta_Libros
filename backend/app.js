var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require ('dotenv');
dotenv.config()
const cors = require ('cors')

//Validar token y proteger rutas
const jwt =require('jsonwebtoken')
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const createEditRouter = require('./routes/admin/createEdit')
const librosRouter = require('./routes/libros')

var app = express();

app.use (cors () );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secured = (req,res,next) =>{

  try {
    
    //headers : Authorization ->Envio de informacion sensible del usuario
    //req.headers.authorization //acceder a cabezeras del cliente

    let token = req.headers.authorization; //token que envia el usuario
    token = token.replace('Bearer ','');
    const publicKey = fs.readFileSync('./claves/publica.pem');
    let decoded = jwt.verify(token,publicKey)
    req.id_permiso = decoded.id_permiso
    req.role = decoded.role;
    console.log(`El token recibido es: ${token}`);
    req.id_permiso == 10 ? next() : res.status(401).json({status : true, message : 'unauthorized',value : req.role})
    

  } catch (error) {
    //token invalido
    console.log("catch del middleware v2")
    res.status(401).json({status : true, message : 'unauthorized'})
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter)
app.use('/libros',librosRouter)
app.use('/create-edit',secured,createEditRouter)

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
