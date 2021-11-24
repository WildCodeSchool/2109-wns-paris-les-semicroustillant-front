import React from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from './schemaTypes';
import Navbar from './components/Navbar';
import Table from './components/TableUser';

import AllUsers from './components/AllUsers';
import DeleteUser from './components/DeleteUser';

function App(): JSX.Element {
  return (
    <div>
      <Navbar />
      <Table />
      <AllUsers />
      <DeleteUser />
    </div>
  );
}

export default App;
