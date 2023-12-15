var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
require('./models/connection');
const fileUpload = require('express-fileupload');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const recruteurRouter = require('./routes/recruteur');
const candidatRouter =require('./routes/candidat'); 





var app = express();
const cors=require('cors');
app.use(fileUpload());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/users', usersRouter);
app.use('/recruteur', recruteurRouter);
app.use('/candidat', candidatRouter);



module.exports = app;
