const EditForm = ({ toggleOpen, movie }) => {
  return (
    <div className="edit-form">
      <div className="image">
        <img src={movie.imagePath} alt="" width="300px" height="444px" />
      </div>
      <div className="button-group">
        <button id="watched-button">Set as watched</button>
        <button id="delete-button">Delete Movie</button>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="amh-rating">AMH Rating</label>
          <div className="input-wrapper">
            <input type="number" />
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
