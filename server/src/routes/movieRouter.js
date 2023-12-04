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
  .get(movieController.getAllMovies)
  .post(upload.single('file'), movieController.createMovie);

router
  .route('/:slug')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
