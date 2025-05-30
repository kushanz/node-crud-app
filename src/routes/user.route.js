const express = require('express');
const { getAllUsers, getUserById, } = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');
const router = express.Router();

router.get('/', verifyToken, authorizeRoles("admin"), getAllUsers);
router.get('/:id', verifyToken, authorizeRoles("superadmin"), getUserById);

module.exports = router;