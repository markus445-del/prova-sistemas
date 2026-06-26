// src/services/authService.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const jwtSecret = process.env.JWT_SECRET || 'dev-secret';
const jwtExpiration = process.env.JWT_EXPIRATION || '1h';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: jwtExpiration,
    });
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports = {
    generateToken,
    hashPassword,
    verifyPassword,
    findUserByEmail,
};