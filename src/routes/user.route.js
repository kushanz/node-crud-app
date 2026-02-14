const express = require('express');
const { getAllUsers, getUserById, searchUsers, } = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');
const router = express.Router();

// search user by email or name
// router.get('/search', verifyToken, authorizeRoles("admin"), searchUsers);

router.get('/', verifyToken, authorizeRoles("admin"), getAllUsers);
router.get('/:id', verifyToken, authorizeRoles("superadmin"), getUserById);

module.exports = router;