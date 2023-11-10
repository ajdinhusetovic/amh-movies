const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have username'],
  },
  password: {
    type: String,
    required: [true, 'User must have password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'User must confirm password'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
