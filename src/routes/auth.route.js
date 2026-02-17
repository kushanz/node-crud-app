const express = require('express');
const router = express.Router();
const {register, login, refreshToken, logout} = require('../controllers/auth.controller.js')

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post('/refreshtoken', refreshToken);

module.exports = router;