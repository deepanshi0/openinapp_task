const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const subtaskController = require('../controllers/subTaskController');


router.post('/', authenticateToken, subtaskController.createSubTask);

router.get('/', authenticateToken, subtaskController.getAllSubTasks);

router.patch('/:id', authenticateToken, subtaskController.updateSubTask);

router.delete('/:id', authenticateToken, subtaskController.deleteSubTask);

module.exports = router;
