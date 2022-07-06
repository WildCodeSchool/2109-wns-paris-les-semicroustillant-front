/* eslint-disable no-case-declarations */
import React, { createContext, useState } from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router/Router';

import 'react-toastify/dist/ReactToastify.css';
import initialState from './context/LoginContext';

import LOGIN from './queries/contextQueries';

interface IDecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

const AuthContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      const [loggedIn, setLoggedIn] = useState(false);

      const { loading, data } = useQuery<any>(LOGIN);

      const GET_USER = gql`
        query GetOneUser($userId: String!) {
          getOneUser(userId: $userId) {
            _id
            firstname
          }
        }
      `;
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.usera,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: initialState,
      };
    default:
      return state;
  }
};
function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
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
      </AuthContext.Provider>
    </>
  );
}

export default App;
