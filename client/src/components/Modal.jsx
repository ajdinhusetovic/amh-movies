const Modal = ({ isOpen, toggleModal, children }) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={toggleModal}>
          Close
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
