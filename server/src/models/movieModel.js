const mongoose = require('mongoose');
const slugify = require('slugify');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie must have a title'],
  },
  //   img
  length: {
    type: Number,
    required: [true, 'Movie must have length'],
  },
  //   actors
  imdbRating: {
    type: Number,
    required: [true, 'Movie must have imdb rating'],
  },
  amhRating: {
    type: Number,
    min: [1, 'Rating must be above or equal to 1'],
    max: [10, 'Rating must be below or equal to 10'],
  },
  category: {
    type: String,
    required: [true, 'Movie must have a category'],
    enum: ['action', 'comedy', 'horror', 'drama', 'animation', 'other'],
    default: 'other',
  },
  isWatched: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
});

movieSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Updates the slug automatically when user updates title
movieSchema.pre('findOneAndUpdate', async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (
    this._update.title &&
    docToUpdate &&
    this._update.title !== docToUpdate.title
  ) {
    this._update.slug = slugify(this._update.title, { lower: true });
  }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
