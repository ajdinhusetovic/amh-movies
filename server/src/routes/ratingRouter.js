const express = require('express');
const ratingController = require('../controllers/ratingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(ratingController.getAllRatings)
  .post(authController.protect, ratingController.createRating);

module.exports = router;
