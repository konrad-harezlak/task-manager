const express = require('express');
const router = express.Router();
const registrationController = require('./registrationController');
const loginController = require('./loginController');

const db = require('./pool');

router.post('/register', registrationController.registerUser);
router.post('/login', loginController.loginUser);
router.get('/home', (req, res) => {
    // Tutaj obsłuż odpowiedź na żądanie GET do /home
    res.send('Witaj na stronie domowej!');
  });

module.exports = router;