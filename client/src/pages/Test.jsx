import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const Test = () => {
  const [cookies, _] = useCookies(['access_token']);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies' && !cookies.access_token) {
      navigate('/');
    }
  }, [cookies.access_token, navigate, location.pathname]);

  return <div>{cookies.access_token}</div>;
};

export default Test;
