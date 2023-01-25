const express = require('express');
const { signup, login } = require('../controllers/user');
const router = express.Router();

// signup
router.post('/signup', signup);

// login
router.post('/login', login);

module.exports = router;
