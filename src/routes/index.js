const express = require('express');
const authMiddleware = require('../middlewares/auth');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const categoryRoutes = require('./categories');
const ticketRoutes = require('./tickets');
const ticketAssignmentRoutes = require('./ticketAssignments');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'helpdesk-api' });
});

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/categories', authMiddleware, categoryRoutes);
router.use('/tickets', authMiddleware, ticketRoutes);
router.use('/ticket-assignments', authMiddleware, ticketAssignmentRoutes);

module.exports = router;
