import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from './schemaTypes';

import Navbar from './components/Navbar';
import AllUsers from './components/AllUsers';
import DeleteUser from './components/DeleteUser';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
        </Routes>
      </Router>
      <DeleteUser />
    </div>
  );
}

export default App;
