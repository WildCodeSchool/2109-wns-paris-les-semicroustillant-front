import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { useQuery, gql } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router';
import LoginContext from './context/LoginContext';
import { GetOneUser } from './schemaTypes';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  interface IDecodedToken {
    userId: string;
    iat: number;
    exp: number;
  }

  const token = localStorage.getItem('token');
  const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
  const userId = decodedToken && decodedToken.userId;

  const GET_USER = gql`
    query GetOneUser($userId: String!) {
      getOneUser(userId: $userId) {
        _id
        firstname
      }
    }
  `;

  const { data } = useQuery<GetOneUser>(GET_USER, { variables: { userId } });
  const username = data?.getOneUser.firstname;

  return (
    <>
      <LoginContext.Provider value={{ username }}>
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
        />
      </LoginContext.Provider>
    </>
  );
}

export default App;
