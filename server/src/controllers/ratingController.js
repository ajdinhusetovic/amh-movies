const Rating = require('../models/ratingModel');
const asyncHandler = require('express-async-handler');
const Movie = require('../models/movieModel');

exports.getAllRatings = asyncHandler(async (req, res, next) => {
  const ratings = await Rating.find();

  res.status(200).json({
    status: 'success',
    results: ratings.length,
    data: {
      ratings,
    },
  });
});

exports.createRating = asyncHandler(async (req, res, next) => {
  // Allow nested routes
  movieSlug = req.params.slug;
  const movie = await Movie.findOne({ slug: movieSlug });
  if (!req.body.movie) req.body.movie = movie._id;
  console.log(req.body.movie);
  if (!req.body.user) req.body.user = req.user.id;
  const newRating = await Rating.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      rating: newRating,
    },
  });
});
