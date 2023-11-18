const Movie = require('../models/movieModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');

exports.createMovie = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const movie = await Movie.findOne({ title });

  if (movie) {
    return next(new AppError('Movie with that name already exists', 409));
  }

  const newMovie = await Movie.create({
    title: req.body.title,
    length: req.body.length,
    imdbRating: req.body.imdbRating,
    category: req.body.category,
  });

  res.status(200).json({ status: 'success', data: newMovie });
});
