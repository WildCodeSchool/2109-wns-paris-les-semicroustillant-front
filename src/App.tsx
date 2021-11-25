import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from './schemaTypes';

import Navbar from './components/Navbar';
import AllUsers from './components/AllUsers';
import DeleteUser from './components/DeleteUser';
import Login from './components/Login';
import TaskList from './components/TaskList';
import Ticket from './components/Ticket';
import AllProject from './components/AllProject';
import Project from './components/Project';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/all-project" element={<AllProject />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
