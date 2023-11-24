const CreateMovieForm = () => {
  return (
    <div className="movie-form-wrapper">
      <h1>Add new movie</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="e.g. The Nun"
            id="title"
            name="title"
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Animation">Animation</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="length">IMDb Rating</label>
          <input
            type="number"
            min="0"
            max="10"
            placeholder="e.g. 5.4"
            step="0.1"
            id="movie-length"
            name="length"
          />
        </div>

        <button type="submit">Add movie</button>
      </form>
    </div>
  );
};

export default CreateMovieForm;
