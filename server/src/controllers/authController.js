const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

exports.signup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});
