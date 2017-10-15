const Student = require('../models/student');

//render the index page
exports.home = (req,res)=>{
    res.render('index')
}

//retrieve all students records from db
exports.readStudents = async (req,res)=>{
    try {
        const students = await Student.find();
        res.render('students',{students})
    } catch (error) {
        console.log(error.message)
    }

}

//render a form for creating new student
exports.newform = async (req,res)=>{
    res.render('form',{title:'Add a new student'});
}

exports.validateStudent = (req,res,next)=>{
    req.checkBody('email','Email field cannot be empty').notEmpty();
    req.checkBody('email','Enter a valid email').isEmail();
    req.sanitizeBody('email',{
        remove_extension:false,
        remove_dots:false,
        gmail_remove_subaddress:false
    }).normalizeEmail();
    req.checkBody('name','Name field cannot be empty').notEmpty();
    req.checkBody('course','Course of study field cannot be empty').notEmpty();

    const errors = req.validationErrors();
    if(errors){
        req.flash('error',errors.map(error=> error.msg));
       return  res.redirect('back');
    }
    next();

}
//create the new user and save to the database
exports.createStudent = async (req,res)=>{
    
    try {
        //check whether  student registered with such email exists first;
        const existingStudent = await Student.findOne({'name':req.body.name});
        if(existingStudent){
            req.flash('error','Student with that name is already registered')
            return res.redirect('back')
        }
        const student = new Student(req.body);
        await student.save();
        req.flash('success','New student has been created');
        res.redirect(`/students/${student._id}`);

    } catch (error) {
        console.log(error.message)
        res.json(error.message);
    }
}

//get a specific student's resource
exports.getStudent = async (req,res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.json('No such student exist');
        }
        res.render('student',{student})
    } catch (error) {
        res.json(error.message);
    }
}

//render a form to edit the user
exports.editform = async (req,res)=>{
    try {
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.json('No such student exist');
        }
        res.render('editForm',{title:'Edit student',student});
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
    
}

//save the updated user to the database
exports.updateStudent = async (req,res)=>{
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        ).exec();
        req.flash('success','Student details have been successfully updated');
        res.redirect(`/students/${student._id}`);

    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

//delete a student record from the database
exports.deleteStudent = async (req,res)=>{
    try {
        const student = await Student.findByIdAndRemove(req.params.id);
        req.flash('success',`${student.name} has been sucessfully deleted`);
        res.redirect('/students')
          
        
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

