import './App.css';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from './schemaTypes';

const GET_USERS = gql`
  query getUsers {
    allUsers {
      _id
      firstname
      lastname
    }
  }
`;

function App(): JSX.Element {
  const { loading, data } = useQuery<getUsers>(GET_USERS);
  console.log(data);
  return <div>Hello world</div>;
}

export default App;
