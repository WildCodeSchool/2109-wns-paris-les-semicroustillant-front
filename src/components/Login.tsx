import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Box from '@mui/material/Box';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo_semi.png';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LOGIN = gql`
    query login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `;
  const [getToken, { data }] = useLazyQuery(LOGIN);
  const navigate = useNavigate();
  if (data) {
    localStorage.setItem('token', data.login);
  }
  const token = localStorage.getItem('token');

  const login = async () => {
    try {
      await getToken({ variables: { email, password } });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Handle me', err);
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="bodyLogin">
      {token === null ? (
        <Box className="loginBoxMain">
          <Box className="loginBox">
            <img className="logo" alt="logo_semi" src={Logo} />
            <h3 className="welcom"> WELCOME !</h3>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="buttonLogin" type="button" onClick={login}>
              Login
            </button>
          </Box>
        </Box>
      ) : (
        <div className="already">
          <h2>You are already logged in</h2>
          <button
            type="button"
            className="homeButton"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
