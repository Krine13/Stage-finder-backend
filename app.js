require('dotenv').config() 
require('./models/connection')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const recruteurRouter = require('./routes/recruteur');
const candidatRouter =require('./routes/candidat'); 
//const annonceRouter=require('./routes/annonce');

var app = express();
const cors=require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/recruteur', recruteurRouter);
app.use('/candidat', candidatRouter);
//app.use('/annonce',annonceRouter);


module.exports = app;