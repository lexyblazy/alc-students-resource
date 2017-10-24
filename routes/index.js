const router = require('express').Router();
const studentController = require('../controllers/studentController');

//the home page
router.get('/',studentController.home);

//get all students from DataBase
router.get('/students',studentController.readStudents);
router.get('/students/page/:page',studentController.readStudents);

//render a form to add new student to the database
router.get('/students/new',studentController.newform)

//create new student with the form data
router.post('/students',studentController.validateStudent, studentController.createStudent);

//retrieve information about a specific student
router.get('/students/:id',studentController.getStudent);

//render a form to edit exisiting student resource
router.get('/students/:id/edit',studentController.editform);

/*
 As touching the updating and deleting routes, 
 I spent minutes think whether to use 
 the regular POST method or PUT/PATCH and DELETE method.
  BTW, it all works. 
 */

//save the updated changes to the database
router.post('/students/:id/update',studentController.updateStudent);

//delete a student's resource from the database
router.post('/students/:id/delete',studentController.deleteStudent);

//search students resource
router.post('/api/students/search',studentController.searchStudents)
//handle unregistered routes
router.get('*',(req,res)=>{
    res.send('The page your are looking for does not exist');
})

router.post('*',(req,res)=>{
    res.send('This route does not exist');
})

module.exports = router;