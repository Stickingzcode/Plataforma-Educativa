const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/role.middleware');
const ctrl = require('../controllers/classroom.controller');

router.post('/', auth, permit('school_admin','superadmin'), ctrl.createClassroom);
router.get('/', auth, permit('school_admin','superadmin','teacher'), ctrl.getClassrooms);
router.get('/:id', auth, permit('school_admin','superadmin','teacher'), ctrl.getClassroom);
router.put('/:id', auth, permit('school_admin','superadmin'), ctrl.updateClassroom);
router.delete('/:id', auth, permit('school_admin','superadmin'), ctrl.deleteClassroom);

module.exports = router;
