const Movie = require('../models/movieModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const { s3Upload, s3Delete } = require('../s3');

exports.getAllMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find(req.query).sort({ createdAt: -1 });

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
  const file = req.file;
  console.log(file);

  const movie = await Movie.findOne({ title });

  if (movie) {
    return next(new AppError('Movie with that name already exists', 409));
  }

  const result = await s3Upload(file);

  const newMovie = await Movie.create({
    title: req.body.title,
    year: req.body.year,
    length: req.body.length,
    imdbRating: req.body.imdbRating,
    category: req.body.category,
    imagePath: result.Location,
  });

  res.status(200).json({ status: 'success', data: newMovie });
});

exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const movieData = await Movie.findOne({ slug });
  const url = movieData.imagePath;

  const parts = url.split('.com/');
  let objectKey;
  if (parts.length === 2) {
    objectKey = parts[1];
  } else {
    console.error('Invalid S3 URL format');
    return null;
  }

  const movie = await Movie.deleteOne({ slug });
  await s3Delete(objectKey);

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
