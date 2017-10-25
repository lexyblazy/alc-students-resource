//requiring npm/third-party modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');

//requiring self-written modules
const routes = require('./routes/index');

//load in variables.env file
require('dotenv').config({path:'variables.env'});

/*
connect to database, 
I prefer to handle database connection request with callbacks to promises.
Just a personal preference
*/

mongoose.connect(process.env.localDB,err => {
    if (err) {
        console.log(err);
    }else{
        console.log('Connection to database was succesful');
    }
})

//tell mongoose to use es6 Promises
mongoose.Promise = global.Promise;
//view engine and some other relevant setups
app.set('view engine','ejs');
app.set('views',`${__dirname}/views`);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//some useful set of middleware
app.use(express.static(`${__dirname}/public`))
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(expressValidator());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})

//use routes
app.use(routes);

//listening port
app.listen(process.env.PORT,()=>{
    console.log("Server is up and running")
})