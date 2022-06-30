import { createContext } from 'react';

interface IDefaultState {
  loggedIn?: boolean;
  token?: string;
  userFirstname?: string;
  userLastname?: string;
  userPosition?: string;
}
export const defaultState = {
  loggedIn: false,
  token: '',
  userFirstname: '',
  userLastname: '',
  userPosition: '',
};

const LoginContext = createContext<IDefaultState>(defaultState);

export default LoginContext;
