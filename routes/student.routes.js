const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/role.middleware');
const ctrl = require('../controllers/student.controller');

router.post('/', auth, permit('school_admin','superadmin'), ctrl.createStudent);
router.get('/', auth, permit('school_admin','superadmin','teacher'), ctrl.getStudents);
router.get('/:id', auth, permit('school_admin','superadmin','teacher'), ctrl.getStudent);
router.put('/:id', auth, permit('school_admin','superadmin'), ctrl.updateStudent);
router.delete('/:id', auth, permit('school_admin','superadmin'), ctrl.deleteStudent);

module.exports = router;
