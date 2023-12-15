require('dotenv').config() 
require('./models/connection')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var evenementRouter = require('./routes/evenement');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var recruteurRouter = require('./routes/recruteur');
var stagiaireRouter = require('./routes/stagiaire');
//var signinRouter = require('./routes/signin');
var app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());



const cors = require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/evenement', evenementRouter);
//app.use('/', indexRouter);
app.use('/recruteur', recruteurRouter);
app.use('/stagiaire', stagiaireRouter);
//app.use('/signin', signinRouter);
//app.use('/users', usersRouter);
module.exports = app;