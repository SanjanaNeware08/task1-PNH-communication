const express = require('express');
const {createTask, getTasks, getTask, updateTask, deleteTask} = require('../controllers/taskControllers');

const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/project/:projectId', protect, createTask);
router.put('/task/:taskId', protect, updateTask);
router.delete('/task/:taskId', protect, deleteTask);
router.get('/task/:taskId', protect, getTask);   
router.get('/project/projectId', protect, getTasks);  
module.exports = router;