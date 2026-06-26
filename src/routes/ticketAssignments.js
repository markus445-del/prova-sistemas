const express = require('express');
const ticketAssignmentController = require('../controllers/ticketAssignmentController');

const router = express.Router();

router.get('/', ticketAssignmentController.list);
router.get('/:id', ticketAssignmentController.get);
router.post('/', ticketAssignmentController.create);
router.put('/:id', ticketAssignmentController.update);
router.delete('/:id', ticketAssignmentController.remove);

module.exports = router;
