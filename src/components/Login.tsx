import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomLoginButton from '../assets/custom-components/login';

import '../styles/Login.css';

import Logo from '../images/logo_semi.png';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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

            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-email">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <CustomLoginButton type="submit" onClick={login}>
              Login
            </CustomLoginButton>
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
