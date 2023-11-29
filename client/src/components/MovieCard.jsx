const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="image">
        <img src={movie.imagePath} alt="" width="300px" height="444px" />
      </div>
      <div className="title">
        <h1>{movie.title}</h1>
      </div>
      <div className="year">
        <p>
          <span className="card-span">Year: </span>
          {movie.year}
        </p>
      </div>
      <div className="category">
        <p>
          <span className="card-span">Category: </span>
          {movie.category}
        </p>
      </div>
      <div className="length">
        <p>
          <span className="card-span">Length: </span> {movie.length}
        </p>
      </div>
      <div className="imdb-rating">
        <p>
          <span className="card-span">imdB Rating: </span>
          {movie.imdbRating}/10
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
