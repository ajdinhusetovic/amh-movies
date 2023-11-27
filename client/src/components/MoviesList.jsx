import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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
        return <h1>movie</h1>;
      })}
    </div>
  );
};

export default MoviesList;
