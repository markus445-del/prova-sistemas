const express = require('express');
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', validateLogin, authController.login);
router.post('/register', authController.register);

module.exports = router;
