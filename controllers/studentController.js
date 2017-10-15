const Student = require('../models/student');

//render the index page
exports.home = (req,res)=>{
    res.render('index')
}

//retrieve all students records from db
exports.readStudents = async (req,res)=>{
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.log(error.message)
    }

}

//render a form for creating new student
exports.newform = async (req,res)=>{
    res.render('form',{title:'Add a new student'});
}

//create the new user and save to the database
exports.createStudent = async (req,res)=>{
    
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student)

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
        res.json(student)
    } catch (error) {
        res.json(error.message);
    }
}

//render a form to edit the user
exports.editform = async (req,res)=>{
    try {
        const student = await Student.findById(req.params.id);
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
        res.json(student)

    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

//delete a student record from the database
exports.deleteStudent = async (req,res)=>{
    try {
        const student = await Student.findByIdAndRemove(req.params.id);
        res.json({
            message:'This entry has been sucessfully deleted',
            student
        })
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

