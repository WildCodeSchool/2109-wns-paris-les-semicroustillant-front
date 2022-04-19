import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { useQuery, gql } from '@apollo/client';
import AppRouter from './Router';
import LoginContext from './context/LoginContext';
import { GetOneUser } from './schemaTypes';

function App(): JSX.Element {
  interface IdecodedToken {
    userId: string;
    iat: number;
    exp: number;
  }

  const token = localStorage.getItem('token');
  const decodedToken: '' | IdecodedToken | null = token && jwt_decode(token);
  const userId = decodedToken && decodedToken.userId;
  console.log(userId);

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
      </LoginContext.Provider>
    </>
  );
}

export default App;
