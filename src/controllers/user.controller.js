const User = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    
    let users;
    if (search) {
      // Search by name or email
      users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      });
    } else {
      // Get all users
      users = await User.find({});
    }
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

// create search user by email or name
// const searchUsers = async (req, res) => {
//   try {
//     const { query } = req.query;
//     if (!query) {
//       return res.status(400).json({ message: 'Query parameter is required' });
//     }

//     const users = await User.find({
//       $or: [
//         { name: { $regex: query, $options: 'i' } },
//         { email: { $regex: query, $options: 'i' } }
//       ]
//     }).select('-password -__v');

//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

module.exports = { getAllUsers, getUserById };