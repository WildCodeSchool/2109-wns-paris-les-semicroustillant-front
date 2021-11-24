import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from './schemaTypes';

import AllUsers from './components/AllUsers';
import DeleteUser from './components/DeleteUser';

function App(): JSX.Element {
  return (
    <div>
      Hello world
      <div>
        <AllUsers />
        <DeleteUser />
      </div>
    </div>
  );
}

export default App;
