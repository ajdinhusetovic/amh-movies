const express = require('express');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');

const router = express.Router();

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router
  .route('/:slug')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
