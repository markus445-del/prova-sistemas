// This file defines the user-related routes for CRUD operations.

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// Get all users
router.get('/', authMiddleware, userController.getAllUsers);

// Get a user by ID
router.get('/:id', authMiddleware, userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:id', authMiddleware, userController.updateUser);

// Delete a user by ID
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;