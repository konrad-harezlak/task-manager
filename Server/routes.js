const express = require('express');
const router = express.Router();
const registrationController = require('./registrationController');
const loginController = require('./loginController');
const taskController = require('./taskController')

const db = require('./pool');

router.post('/register', registrationController.registerUser);
router.post('/login', loginController.loginUser);
router.post('/addTask', taskController.addTask);
router.post('/categories',taskController.getCategories)
router.post('/tasks',taskController.getTasks)
router.post('/deleteTask',taskController.deleteTask)

module.exports = router;