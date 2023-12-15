import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMovieForm = ({ toggleModal }) => {
  const [title, setTitle] = useState('');
  const [length, setLength] = useState(0);
  const [category, setCategory] = useState('other');
  const [imdbRating, setImdbRating] = useState(0);
  const [year, setYear] = useState(0);
  const [file, setFile] = useState();
  const [cookies, _] = useCookies(['access_token']);

  const [errorMsg, setErrorMsg] = useState('');

  const handleMovieError = () => {
    if (title === '') {
      setErrorMsg('Movie must have title');
    }

    if (length <= 0) {
      setErrorMsg('Length must be above 0');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', title);
    formData.append('year', year);
    formData.append('length', length);
    formData.append('category', category);
    formData.append('imdbRating', imdbRating);
    formData.append('file', file);

    try {
      await axios.post(
        'https://amh-movies-api.onrender.com/api/v1/movies',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      toast.success('Movie added successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      toggleModal();
    } catch (error) {
      handleMovieError();
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
          <label htmlFor="year">Year</label>
          <input
            type="number"
            placeholder="e.g. 2017"
            min="1900"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
            min="1"
            max="10"
            placeholder="e.g. 5.4"
            step="0.1"
            id="imdb-rating"
            name="imdb-rating"
            value={imdbRating}
            onChange={(e) => setImdbRating(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="movie-image">Movie image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <button type="submit">Add movie</button>
      </form>
    </div>
  );
};

export default CreateMovieForm;
