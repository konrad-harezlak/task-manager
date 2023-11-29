const express = require('express');
const router = express.Router();
const registrationController = require('./registrationController');
const loginController = require('./loginController');

const db = require('./pool');

router.post('/register', registrationController.registerUser);
router.post('/login', loginController.loginUser);


module.exports = router;