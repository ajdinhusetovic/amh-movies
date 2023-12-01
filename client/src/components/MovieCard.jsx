import React, { useState } from 'react';
import EditForm from './EditForm';
import Modal from './Modal';

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);

  const movieProp = Object.create(movie);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="movie-card">
      {!isOpen && (
        <>
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
              <span className="card-span">Length: </span> {movie.length}m
            </p>
          </div>
          <div className="imdb-rating">
            <p>
              <span className="card-span">imdB Rating: </span>
              {movie.imdbRating}/10
            </p>
          </div>
          <div className="amh-rating">
            <p>
              <span className="card-span">AMH Rating: </span>
              {movie.amhRating}/10
            </p>
          </div>
          <div className="watch-status">
            <p>
              <span className="card-span">Watch status:</span>{' '}
              {movie.isWatched ? (
                <span id="watched"></span>
              ) : (
                <span id="not-watched"></span>
              )}
            </p>
          </div>
          <button id="edit-btn" onClick={toggleOpen}>
            Edit Movie
          </button>
        </>
      )}
      {isOpen && <EditForm toggleOpen={toggleOpen} movie={movie} />}
    </div>
  );
};

export default MovieCard;
