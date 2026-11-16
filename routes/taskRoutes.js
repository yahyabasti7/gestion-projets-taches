
const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const managerOnly = require('../middleware/managerMiddleware');

const {
    createTask,
    getTasks,
    updateTaskStatus,
    assignTask
} = require('../controllers/taskController');

// rout mta3 task protected
router.post('/', protect, createTask);
router.get('/project/:projectId', protect, getTasks);

// route mta3 update task
router.put('/:id/status', protect, updateTaskStatus);

// route mta3 assign task lel manager bark
router.put('/:id/assign', protect, managerOnly, assignTask);

module.exports = router;
