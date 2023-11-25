const Movie = require('../models/movieModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');

exports.getAllMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find().sort({ createdAt: -1 });

  if (movies.length === 0) {
    return next(new AppError('No movies found', 404));
  }

  res.status(200).json({
    status: 'sucess',
    results: movies.length,
    movies,
  });
});

exports.getMovie = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const movie = await Movie.findOne({ slug });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    movie,
  });
});

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

exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const movie = await Movie.deleteOne({ slug });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});

exports.updateMovie = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const movie = await Movie.findOneAndUpdate({ slug }, req.body, {
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError('No movie found', 409));
  }

  res.status(200).json({ message: 'success', movie });
});
