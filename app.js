//requiring npm/third-party modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//requiring self-written modules
const routes = require('./routes/index');

//connect to database, prefer to handle database connection request with callbacks
//Just a personal preference
const localDB = 'mongodb://127.0.0.1:27017/students'
mongoose.connect(localDB,err => {
    if (err) {
        console.log(err);
    }else{
        console.log('Connection to database was succesful');
    }
})

//view engine and some other relevant setups
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//use routes
app.use(routes);

//listening port
app.listen(3000,()=>{
    console.log("Server is up and running")
})