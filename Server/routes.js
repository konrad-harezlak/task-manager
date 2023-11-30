const express = require('express');
const router = express.Router();
const registrationController = require('./registrationController');
const loginController = require('./loginController');
const taskController = require('./taskController')

const db = require('./pool');

router.post('/register', registrationController.registerUser);
router.post('/login', loginController.loginUser);
router.post('/tasks', taskController.addTask);
router.post('/categories',taskController.getCategories)

module.exports = router;