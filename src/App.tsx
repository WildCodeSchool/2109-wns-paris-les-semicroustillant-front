import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from './schemaTypes';

import AllUsers from './components/AllUsers';

// const GET_USERS = gql`
//   query getUsers {
//     allUsers {
//       _id
//       firstname
//       lastname
//     }
//   }
// `;

function App(): JSX.Element {
  // const { loading, data } = useQuery<getUsers>(GET_USERS);
  // console.log(data);
  return (
    <div>
      Hello world
      <div>
        <AllUsers />
      </div>
    </div>
  );
}

export default App;
