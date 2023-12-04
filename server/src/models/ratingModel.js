const mongoose = require('mongoose');
const Movie = require('./movieModel');

const ratingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Rating must have user'],
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Rating must have movie'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ratingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'movie',
    select: 'title',
  }).populate({
    path: 'user',
    select: 'username',
  });
  next();
});

ratingSchema.statics.calculateAverageRatings = async function (movieId) {
  const stats = await this.aggregate([
    {
      $match: { movie: movieId },
    },
    {
      $group: {
        _id: 'movie',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Movie.findByIdAndUpdate(movieId, {
      numberOfRatings: stats[0].nRating,
      amhRating: stats[0].avgRating,
    });
  } else {
    await Movie.findByIdAndUpdate(movieId, {
      numberOfRatings: 0,
      amhRating: 1,
    });
  }
};

ratingSchema.post('save', function () {
  this.constructor.calculateAverageRatings(this.movie);
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
