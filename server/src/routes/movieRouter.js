const express = require('express');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');
const multer = require('multer');
const Movie = require('../models/movieModel');
const ratingRouter = require('./ratingRouter');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.use('/:slug/ratings', ratingRouter);

router
  .route('/')
  .get(authController.protect, movieController.getAllMovies)
  .post(
    upload.single('file'),
    authController.protect,
    movieController.createMovie,
  );

router
  .route('/:slug')
  .get(authController.protect, movieController.getMovie)
  .patch(authController.protect, movieController.updateMovie)
  .delete(authController.protect, movieController.deleteMovie);

module.exports = router;
