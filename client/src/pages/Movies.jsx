import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const Test = () => {
  const [cookies, _] = useCookies(['access_token']);

  const navigate = useNavigate();
  const location = useLocation();

  // look up explanation details
  useEffect(() => {
    if (location.pathname === '/movies' && !cookies.access_token) {
      navigate('/');
    }
  }, [cookies.access_token, navigate, location.pathname]);

  return <div>movies</div>;
};

export default Test;
