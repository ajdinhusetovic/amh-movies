const User = require('../models/userModel');

exports.signup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
};
