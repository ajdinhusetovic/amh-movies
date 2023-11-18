const express = require('express');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');
const Movie = require('../models/movieModel');

const router = express.Router();

router.route('/').post(movieController.createMovie);

module.exports = router;
