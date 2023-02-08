const express = require('express');
const { registerSuperadmin, login } = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/role.middleware');

const router = express.Router();

router.post('/register', auth, permit('superadmin'), registerSuperadmin);
router.post('/login', login);

module.exports = router;
