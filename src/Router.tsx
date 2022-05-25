import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './App.css';

import AllUsers from './components/AllUsers';
import Login from './components/Login';
import TaskList from './components/TasksList/TaskList';
import Ticket from './components/Ticket';
import AllProject from './components/AllProject';
import Project from './components/Project';
import AddUserX from './components/AddUserX';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';

export default function AppRouter(): JSX.Element {
  const useAuth = () => {
    const user = localStorage.getItem('token');
    if (user) return true;

    return false;
  };

  const ProtectedRoutes = () => {
    const auth = useAuth();

    return auth ? (
      <>
        <Navbar />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/all-tasks" element={<TaskList />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/all-projects" element={<AllProject />} />
          <Route path="/project" element={<Project />} />
          <Route path="/add-user" element={<AddUserX />} />
        </Route>
      </Routes>
    </Router>
  );
}
