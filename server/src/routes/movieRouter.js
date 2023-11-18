const express = require('express');
const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');

const router = express.Router();

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router
  .route('/:id')
  .get(movieController.getMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
