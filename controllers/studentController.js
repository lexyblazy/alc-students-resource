const Student = require('../models/student');

exports.readStudents = async (req,res)=>{
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.log(error.message)
    }

}

exports.createStudent = async (req,res)=>{
    console.log(req.body);
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student)

    } catch (error) {
        console.log(error.message)
        res.json(error.message);
    }
}

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