// This file sets up the main routes for the application.

import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';

const router = express.Router();

// Use authentication routes
router.use('/auth', authRoutes);

// Use user-related routes
router.use('/users', userRoutes);

export default router;