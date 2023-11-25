import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMovieForm = ({ toggleModal }) => {
  const [title, setTitle] = useState('');
  const [length, setLength] = useState(0);
  const [category, setCategory] = useState('other');
  const [imdbRating, setImdbRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/v1/movies', {
        title,
        length,
        category,
        imdbRating,
      });
      toast.success('Movie added successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="movie-form-wrapper">
      <h1>Add new movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="e.g. The Nun"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="length">Length</label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 98"
            id="movie-length"
            name="length"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="animation">Animation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imdb-rating">IMDb Rating</label>
          <input
            type="number"
            min="0"
            max="10"
            placeholder="e.g. 5.4"
            step="0.1"
            id="imdb-rating"
            name="imdb-rating"
            value={imdbRating}
            onChange={(e) => setImdbRating(e.target.value)}
          />
        </div>

        <button type="submit">Add movie</button>
      </form>
    </div>
  );
};

export default CreateMovieForm;
