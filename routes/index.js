const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/',)

router.get('/students',studentController.getStudents);


module.exports = router;