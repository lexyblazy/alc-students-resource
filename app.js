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

/*
connect to database, 
I prefer to handle database connection request with callbacks to promises.
Just a personal preference
*/
const localDB = 'mongodb://127.0.0.1:27017/students'
mongoose.connect(localDB,err => {
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//some useful set of middleware
app.use(session({
    secret:'Some random secret here',
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
app.listen(3000,()=>{
    console.log("Server is up and running")
})