import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Routes from 'routes';

const unauthenticated_url = ['', 'login', 'register', 'forgot-password', 'reset-password', 'verify', 'not-found', 'callback'];
const AppContainer = () => {
  const [verified, setVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkValidity();
  }, [useLocation()]);

  async function checkValidity() {
    if (location && unauthenticated_url.indexOf(location.pathname.split('/')[1]) !== -1) {
      setVerified(true);
    } else {
      var bodyFormData = new FormData();
      bodyFormData.append('token', localStorage.getItem('token') || '');
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/auth/validateToken`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => {
          if ((response.status === 200) & (response.data.message == 'success')) {
            setVerified(true);
          } else {
            setVerified(false);
            navigate('/login');
          }
        })
        .catch(() => {
          toast.error('Token Expireed!');
          navigate('/login');
        });
    }
  }
  return verified ? <>{<Routes />}</> : <></>;
};

export default AppContainer;
