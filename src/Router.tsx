import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import Login from './components/Login';
import AllUsers from './components/AllUsers';
import TaskList from './components/TasksList/TaskList';
import Project from './containers/Project';
import Projects from './containers/Projects';
import AddUserX from './components/AddUserX';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';

import { CheckUserToken } from './schemaTypes';
import { CHECK_USER_TOKEN } from './queries/AuthQueries';

import './App.css';

export default function AppRouter(): JSX.Element {
  const checkUserToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const { data } = useQuery<CheckUserToken>(CHECK_USER_TOKEN, {
      variables: { token },
    });

    return data?.checkUserToken ?? [];
  };

  const ProtectedRoutes = () => {
    useLocation();
    const auth = checkUserToken();

    if (!auth) {
      localStorage.removeItem('token');
      toast.error('Please log in again');
    }

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
          <Route path="/users" element={<AllUsers />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project" element={<Project />} />{' '}
          {/* @FREDY: TO BE DELETED, USELESS */}
          <Route path="/add-user" element={<AddUserX />} />{' '}
          {/* @FREDY: TO BE DELETED, SHOULD BE A MODAL */}
          {/* MISSING ROUTE: USER PROFILE (OR MODAL??) */}
        </Route>
      </Routes>
    </Router>
  );
}
