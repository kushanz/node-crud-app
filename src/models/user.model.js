const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please provide a firstname'],
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a lastname'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user','superadmin'],
    default: 'user',
  },
}, 
{ timestamps: true }
);

const user = mongoose.model('User', userSchema);
module.exports = user;