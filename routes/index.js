const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/',(req,res)=>{
    res.send('Shit happens')
})

router.get('/students',studentController.readStudents);

// router.get('/students/new',studentController.createStudent)

router.post('/students',studentController.createStudent);

router.post('/students/:id/update',studentController.updateStudent);

router.post('/students/:id/delete',studentController.deleteStudent);


module.exports = router;