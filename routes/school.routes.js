const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/role.middleware');
const schoolController = require('../controllers/school.controller');

router.post('/', auth, permit('superadmin'), schoolController.createSchool);
router.get('/', auth, permit('superadmin'), schoolController.getSchools);
router.get('/:id', auth, permit('superadmin'), schoolController.getSchool);
router.put('/:id', auth, permit('superadmin'), schoolController.updateSchool);
router.delete('/:id', auth, permit('superadmin'), schoolController.deleteSchool);

module.exports = router;
