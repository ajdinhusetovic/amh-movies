const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');

exports.signup = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return next(new AppError('Username already taken', 400));
  }
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});
