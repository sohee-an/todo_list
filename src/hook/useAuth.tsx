import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (redirectTo = '/') => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate(redirectTo);
    } else {
      navigate('/login');
    }
  }, [navigate, redirectTo]);

  return isLoggedIn;
};

export default useAuth;
