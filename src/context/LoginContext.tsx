import { createContext } from 'react';

interface IDefaultState {
  loggedIn?: boolean;
  token?: string;
  username?: string;
  role?: string;
  position?: string;
}
export const defaultState = {
  loggedIn: false,
  token: '',
  username: '',
  role: '',
  position: '',
};

const LoginContext = createContext<IDefaultState>(defaultState);

export default LoginContext;
