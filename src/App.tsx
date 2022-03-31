import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import AllUsers from './components/AllUsers';
import Login from './components/Login';
import TaskList from './components/TaskList';
import Ticket from './components/Ticket';
import AllProject from './components/AllProject';
import Project from './components/Project';
import AddUserX from './components/AddUserX';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/all-project" element={<AllProject />} />
          <Route path="/project" element={<Project />} />
          <Route path="/add-user" element={<AddUserX />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
