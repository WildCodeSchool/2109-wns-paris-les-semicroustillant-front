import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router';
import LoginContext from './context/LoginContext';
import 'react-toastify/dist/ReactToastify.css';

interface IDecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

function App(): JSX.Element {
  const token = localStorage.getItem('token');
  const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
  const userId = decodedToken && decodedToken.userId || '';

  return (
    <>
      <LoginContext.Provider
        value={{ userId }}
      >
        <AppRouter />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </LoginContext.Provider>
    </>
  );
}

export default App;
