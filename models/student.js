//require the necessary packages
const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise //tell mongoose to use es6 promises
const mongooseErrorHandler = require('mongoose-mongodb-errors'); 
const validator = require('validator');
const md5 = require('md5');


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
    course:{
        type:String,
        required:'You must supply a course'
    },
    year:Number,
    date:{
        type:Date,
        default:Date.now
    }
    
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

//generate the gravatar virtual field on the fly
studentSchema.virtual('gravatar').get(function(){
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}`
})

//index the studentSchema for search purposes
studentSchema.index({
    name:'text',
    email:'text',
    course:'text'
})

module.exports = mongoose.model('Student',studentSchema);