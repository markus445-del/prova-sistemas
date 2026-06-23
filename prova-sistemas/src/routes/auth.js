// This file defines the authentication routes, including the login route.

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../middlewares/auth');

// Login route
router.post('/login', validateLogin, authController.login);

module.exports = router;