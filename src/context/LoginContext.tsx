import { createContext } from 'react';

interface IDefaultState {
  loggedIn?: boolean;
  token?: string;
  username?: string;
}
export const defaultState = {
  loggedIn: false,
  token: '',
  username: '',
};

const LoginContext = createContext<IDefaultState>(defaultState);

export default LoginContext;
