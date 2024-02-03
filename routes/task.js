const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const taskController = require('../controllers/taskController');


router.post('/', authenticateToken,taskController.createTask);
router.get('/', authenticateToken,taskController.getAllTasks);
router.patch('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id',authenticateToken, taskController.deleteTask);

module.exports = router;
