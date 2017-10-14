//require the necessary packages
const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise //tell mongoose to use es6 promises

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
        unique:true,
        trim:true,
        lowercase:true
    },
    course:String,
    year:Number,
    
})

module.exports = mongoose.model('Student',studentSchema);