const User = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v'); // Exclude password field

    const u = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    });

    res.status(200).json(u);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllUsers, getUserById};