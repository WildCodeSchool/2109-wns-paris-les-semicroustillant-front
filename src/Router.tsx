import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import AllUsers from './components/AllUsers';
import AddUserX from './components/AddUserX';
import TaskList from './components/TasksList/TaskList';
import AllProject from './components/AllProject';
import Project from './components/Project';

import LoginContext from './context/LoginContext';
import { CHECK_USER_TOKEN } from './queries/AuthQueries';
import { CheckUserToken } from './schemaTypes';
import { IDecodedToken } from './types/custom-types';

import './App.css';

export default function AppRouter(): JSX.Element {
  const [userId, setUserId] = useState<string | unknown>();

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

    useEffect(() => {
      const token = localStorage.getItem('token');
      const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
      setUserId(decodedToken && decodedToken.userId);
    }, []);
  
    return auth ? (
      <>
        <LoginContext.Provider value={{ userId }}>
          <Navbar />
          <Outlet />
        </LoginContext.Provider>
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
          <Route path="/projects" element={<AllProject />} />
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
