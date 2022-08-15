import { createContext } from 'react';

interface IDefaultState {
  loggedIn?: boolean;
  token?: string;
  userId: string | unknown;
}
export const defaultState = {
  loggedIn: false,
  token: '',
  userId: '',
};

const LoginContext = createContext<IDefaultState>(defaultState);

export default LoginContext;
