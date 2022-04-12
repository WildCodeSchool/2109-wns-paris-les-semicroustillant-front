import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Box from '@mui/material/Box';
import '../styles/Login.css';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getToken, { data }] = useLazyQuery(LOGIN);
  if (data) {
    localStorage.setItem('token', data.login);
  }

  return (
    <>
      <Box className="loginBoxMain">
        <Box className="loginBox">
          <img
            className="logo"
            alt="logo_semi"
            src="https://zupimages.net/up/22/13/zx35.png"
          />
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
          <button
            className="buttonLogin"
            type="button"
            onClick={async () => {
              try {
                await getToken({ variables: { email, password } });
              } catch (err) {
                // eslint-disable-next-line no-console
                console.log('Handle me', err);
              }
            }}
          >
            Login
          </button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
