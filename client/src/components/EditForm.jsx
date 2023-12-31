import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const EditForm = ({ toggleOpen, movie }) => {
  const [amhRating, setAmhRating] = useState(1);
  const [cookies, _] = useCookies(['access_token']);

  const handleWatched = async () => {
    try {
      const response = await axios.patch(
        `https://amh-movies-api.onrender.com/api/v1/movies/${movie.slug}`,
        {
          isWatched: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://amh-movies-api.onrender.com/api/v1/movies/${movie.slug}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRating = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        `https://amh-movies-api.onrender.com/api/v1/movies/${movie.slug}/ratings`,
        {
          rating: amhRating,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-form">
      <div className="image">
        <img src={movie.imagePath} alt="" width="300px" height="444px" />
      </div>
      <div className="button-group">
        <button id="watched-button" onClick={handleWatched}>
          Set as watched
        </button>
        <button id="delete-button" onClick={handleDelete}>
          Delete Movie
        </button>
      </div>
      <form onSubmit={handleAddRating}>
        <div className="form-group">
          <label htmlFor="amh-rating">AMH Rating</label>
          <div className="input-wrapper">
            <input
              type="number"
              min="1"
              max="10"
              placeholder="e.g. 5.4"
              step="0.1"
              onChange={(e) => setAmhRating(e.target.value)}
            />
            <button>Add rating</button>
          </div>
        </div>
      </form>
      <button id="close-button" onClick={toggleOpen}>
        X
      </button>
    </div>
  );
};

export default EditForm;
