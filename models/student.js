//require the necessary packages
const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise //tell mongoose to use es6 promises
const mongooseErrorHandler = require('mongoose-mongodb-errors'); 
const validator = require('validator');


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:'You must enter a name',
        trim:'true',
        unique:'true'
    },
    email:{
        type:String,
        required:'You must supply an email',
        trim:true,
        validate:[validator.isEmail,'Invalid Email address'],
        lowercase:true
    },
    course:String,
    year:Number,
    
})

module.exports = mongoose.model('Student',studentSchema);