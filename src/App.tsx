import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import AppRouter from './Router';
import LoginContext from './context/LoginContext';
import { GetOneUser } from './schemaTypes';
import { GET_ONE_USER_BY_ID } from './queries/UserQueries';

function App(): JSX.Element {
  interface IDecodedToken {
    userId: string;
    iat: number;
    exp: number;
  }

  const token = localStorage.getItem('token');
  const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
  const userId = decodedToken && decodedToken.userId;

  const { data } = useQuery<GetOneUser>(GET_ONE_USER_BY_ID, { variables: { userId } });
  // @TODO: handle error if no user found

  const username = data?.getOneUser.firstname;
  const role = data?.getOneUser.role;
  const position = data?.getOneUser.position;

  return (
    <>
      <LoginContext.Provider value={{ userId, username, role, position }}>
        <AppRouter />
      </LoginContext.Provider>
    </>
  );
}

export default App;
