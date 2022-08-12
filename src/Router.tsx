import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import './App.css';

import Users from './containers/Users';
import Login from './components/Login';
import TaskList from './components/TasksList/TaskList';
import Project from './containers/Project';
import Projects from './containers/Projects';
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
          <Route path="/users" element={<Users />} />
          <Route path="/all-tasks" element={<TaskList />} />
          <Route path="/all-projects" element={<Projects />} />
          <Route path="/project" element={<Project />} />
          <Route path="/add-user" element={<AddUserX />} />
        </Route>
      </Routes>
    </Router>
  );
}
