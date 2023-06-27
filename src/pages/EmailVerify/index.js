/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerify = () => {
  const params = useParams();
  const [verifyStatus, setVerifyStatus] = useState('Verifying ...');
  const navigate = useNavigate();
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    if (params.token !== '') {
      var bodyFormData = new FormData();
      bodyFormData.append('token', params.token);
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/auth/verifyemail`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((res) => {
          console.log('res', params.token);
          if (res.status === 200) {
            setVerifyStatus('Verified. Redirecting...');
            localStorage.setItem('token', params.token);
            navigate('/dashboard');
          }
          if (res.status === 205) {
            setVerifyStatus('Token Expired...');
          } else {
            setVerifyStatus('Verification Failed');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.token]);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{verifyStatus}</h1>
    </div>
  );
};

export default EmailVerify;
