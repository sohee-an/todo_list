import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserId = (): string | null => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
    } else {
      alert('로그인을 해주세요');
      navigate('/login');
    }
  }, []);

  return userId;
};

export default useUserId;
