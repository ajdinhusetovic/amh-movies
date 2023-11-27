import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import MovieCard from './MovieCard';

const MoviesList = () => {
  const query = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/v1/movies');
      return response.data;
    },
  });

  console.log(query.data);
  return (
    <div>
      {query.data.movies.map((movie) => {
        return <MovieCard movie={movie} />;
      })}
    </div>
  );
};

export default MoviesList;
