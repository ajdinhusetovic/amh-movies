const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

exports.signup = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return next(new AppError('Username already taken', 400));
  }
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.signIn = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Check if user sent username and password
  if (!username || !password) {
    return next(new AppError('Missing field!', 400));
  }

  const user = await User.findOne({ username });

  // Check if user exists
  if (!user) {
    return next(new AppError('Incorrect username/password', 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Check if entered password is valid
  if (!isPasswordValid) {
    return next(new AppError('Incorrect username/password', 400));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
    userID: user._id,
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // 1) Get token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in.', 401));
  }

  // 2) Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401),
    );
  }
  next();
});
