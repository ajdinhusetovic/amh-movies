const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (users.length === 0) {
    return res.status(404).json({ status: 'fail', message: 'No users found' });
  }

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
