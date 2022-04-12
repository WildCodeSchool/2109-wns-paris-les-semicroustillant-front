import React, { createContext } from 'react';

interface IDefaultState {
  loggedIn: boolean;
  token?: string;
}
export const defaultState = {
  loggedIn: false,
  token: '',
};

const LoginContext = createContext<IDefaultState>(defaultState);

export default LoginContext;
