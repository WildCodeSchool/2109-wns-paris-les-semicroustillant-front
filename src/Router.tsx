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
import UsersList from './components/users/UsersList';
import TaskList from './components/tasks/TaskList';
import ProjectList from './components/projects/ProjectList';
import Project from './components/Project';

import LoginContext from './context/LoginContext';
import { CHECK_USER_TOKEN } from './queries/AuthQueries';
import { CheckUserToken } from './schemaTypes';
import { InsideToken, CustomJwtPayload } from './types/custom-types';

import './App.css';

export default function AppRouter(): JSX.Element {
  const [userId, setUserId] = useState<InsideToken>(null);
  const [userRole, setUserRole] = useState<InsideToken>(null);

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

      if (!token) return;
      const decodedToken: CustomJwtPayload = jwt_decode(token);

      if (decodedToken?.userId && decodedToken?.userRole) {
        setUserId(decodedToken.userId);
        setUserRole(decodedToken.userRole);
      }
    }, []);

    return auth && userId && userRole ? (
      <>
        <LoginContext.Provider value={{ userId, userRole }}>
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
          <Route path="/users" element={<UsersList />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/project" element={<Project />} />
          {/* @FREDY: TO BE DELETED, USELESS */}
          {/* MISSING ROUTE: USER PROFILE (OR MODAL??) */}
        </Route>
      </Routes>
    </Router>
  );
}
