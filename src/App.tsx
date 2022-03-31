import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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

  const UnreachableLogin = ({ user, children }: IProtectedRoute) => {
    if (user) {
      return <Navigate to="/all-users" replace />;
    }
    return children;
  };
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
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
            path="/all-project"
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
          <Route
            path="/login"
            element={
              <UnreachableLogin user={userToken}>
                <Login />
              </UnreachableLogin>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
