import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

import AllUsers from './components/AllUsers';
import Login from './components/Login';
import TaskList from './components/TaskList';
import Ticket from './components/Ticket';
import AllProject from './components/AllProject';
import Project from './components/Project';
import AddUserX from './components/AddUserX';
import Homepage from './components/Homepage';

export default function AppRouter(): JSX.Element {
  interface IProtectedRoute {
    user: string | null;
    children: JSX.Element;
  }

  const userToken = localStorage.getItem('token');

  const ProtectedRoute = ({ user, children }: IProtectedRoute) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // const UnreachableLogin = ({ user, children }: IProtectedRoute) => {
  //   if (user) {
  //     return <Navigate to="/all-users" replace />;
  //   }
  //   return children;
  // };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={userToken}>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/login"
          element={
            <UnreachableLogin user={userToken}>
              <Login />
            </UnreachableLogin>
          }
        /> */}
        <Route
          path="/all-users"
          element={
            <ProtectedRoute user={userToken}>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-list"
          element={
            <ProtectedRoute user={userToken}>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket"
          element={
            <ProtectedRoute user={userToken}>
              <Ticket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-projects"
          element={
            <ProtectedRoute user={userToken}>
              <AllProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project"
          element={
            <ProtectedRoute user={userToken}>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute user={userToken}>
              <AddUserX />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
