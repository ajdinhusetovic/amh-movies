import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../components/Modal';
import CreateMovieForm from '../components/CreateMovieForm';
import '../scss/app.scss';

const Test = () => {
  const [cookies, _] = useCookies(['access_token']);

  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // look up explanation details
  useEffect(() => {
    if (location.pathname === '/movies' && !cookies.access_token) {
      navigate('/');
    }
  }, [cookies.access_token, navigate, location.pathname]);

  return (
    <div>
      {!isModalOpen && (
        <div>
          <button onClick={toggleModal}>Open Modal</button>
          <h1>Main Content</h1>
          <p>Other content on the page</p>
        </div>
      )}

      {/* Render only the modal when it is open */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <CreateMovieForm />
        </Modal>
      )}
    </div>
  );
};

export default Test;
