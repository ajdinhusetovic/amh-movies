import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import MovieCard from './MovieCard';
import '../scss/app.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';

const MoviesList = ({ toggleModal }) => {
  const [cookies, _] = useCookies(['access_token']);
  const [url, setUrl] = useState(
    'https://amh-movies-api.onrender.com/api/v1/movies'
  );
  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleCategory = (category) => {
    const newUrl = `https://amh-movies-api.onrender.com/api/v1/movies?category=${category}`;
    setUrl(newUrl);
  };

  const handleWatched = (isWatched) => {
    const newUrl = `https://amh-movies-api.onrender.com/api/v1/movies?isWatched=${isWatched}`;
    setUrl(newUrl);
  };

  const query = useQuery({
    queryKey: ['movies', url],
    queryFn: async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      return response.data;
    },
    retry: 0,
  });

  useEffect(() => {
    if (query.error && !errorOccurred) {
      setErrorOccurred(true);
      toast.error('No movies found with that category', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setUrl('https://amh-movies-api.onrender.com/api/v1/movies');
    }
  }, [query.error, errorOccurred]);

  useEffect(() => {
    if (!query.error && errorOccurred) {
      setErrorOccurred(false);
    }
  }, [query.error, errorOccurred]);

  return (
    <div className="movies-list-wrapper">
      {query.isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="button-wrapper">
            <button id="add-movie-button" onClick={toggleModal}>
              Add movie
            </button>
            <button onClick={() => handleCategory('action')}>Action</button>
            <button onClick={() => handleCategory('comedy')}>Comedy</button>
            <button onClick={() => handleCategory('drama')}>Drama</button>
            <button onClick={() => handleCategory('horror')}>Horror</button>
            <button onClick={() => handleCategory('animation')}>
              Animation
            </button>
            <button onClick={() => handleCategory('other')}>Other</button>
            <button onClick={() => handleWatched(true)}>Watched</button>
            <button
              onClick={() =>
                setUrl('https://amh-movies-api.onrender.com/api/v1/movies')
              }
            >
              All
            </button>
          </div>
          <div className="movies-list">
            {query.data?.movies.map((movie) => {
              return <MovieCard key={movie._id} movie={movie} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesList;
