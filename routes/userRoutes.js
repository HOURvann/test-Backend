const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// ផ្លូវសម្រាប់ Register: /api/users/register
router.post('/register', registerUser);

// ផ្លូវសម្រាប់ Login: /api/users/login
router.post('/login', authUser);

module.exports = router;