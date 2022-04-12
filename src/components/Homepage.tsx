import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';

export default function Homepage(): JSX.Element {
  const { loggedIn } = useContext(LoginContext);
  console.log(loggedIn);
  return <h1>Homepage</h1>;
}
