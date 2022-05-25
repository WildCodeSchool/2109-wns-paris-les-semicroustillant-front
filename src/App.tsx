import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { useQuery, gql } from '@apollo/client';
import AppRouter from './Router';
import LoginContext from './context/LoginContext';
import { GetOneUser } from './schemaTypes';

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
        role
        position
      }
    }
  `;

  const { data } = useQuery<GetOneUser>(GET_USER, { variables: { userId } });
  const username = data?.getOneUser.firstname;
  const role = data?.getOneUser.role;
  const position = data?.getOneUser.position;

  return (
    <>
      <LoginContext.Provider value={{ username, role, position }}>
        <AppRouter />
      </LoginContext.Provider>
    </>
  );
}

export default App;
