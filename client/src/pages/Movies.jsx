import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import '../scss/app.scss';
import Modal from '../components/Modal';
import CreateMovieForm from '../components/CreateMovieForm';
import MoviesList from '../components/MoviesList';

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
        <div className="movies-list-wrapper">
          <div>
            <MoviesList toggleModal={toggleModal} />
          </div>
        </div>
      )}

      {/* Render only the modal when it is open */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
          <CreateMovieForm toggleModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Test;
