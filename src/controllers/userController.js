// This file contains the userController which exports CRUD functions for managing users.

const { User } = require('../models');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await User.create({ email, password });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.email = email || user.email;
        user.password = password || user.password;
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
};