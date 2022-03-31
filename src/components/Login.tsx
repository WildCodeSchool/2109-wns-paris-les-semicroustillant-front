import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getToken, { data }] = useLazyQuery(LOGIN);
  if (data) {
    localStorage.setItem('token', data.login);
  }

  return (
    <>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button
        type="button"
        onClick={async () => {
          try {
            await getToken({ variables: { email, password } });
          } catch (err) {
            console.log('Handle me', err);
          }
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
