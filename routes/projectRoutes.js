
const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const {
    createProject,
    getProjects
} = require('../controllers/projectController');

// routes mta3 l protected projects
router.post('/', protect, createProject);
router.get('/', protect, getProjects);

module.exports = router;
