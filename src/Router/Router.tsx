import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import '../App.css';

// import Users from './containers/Users';
import AllUsers from '../components/AllUsers';
import Login from '../components/Login';
import TaskList from '../components/TasksList/TaskList';
import AllProject from '../components/AllProject';
import Project from '../components/Project';
import AddUserX from '../components/AddUserX';
import Homepage from '../components/Homepage';
import PrivateRoute from './PrivateRoute';

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Homepage} />} />
        <Route path="/users" element={<PrivateRoute component={AllUsers} />} />
        <Route
          path="/all-tasks"
          element={<PrivateRoute component={TaskList} />}
        />
        <Route
          path="/all-projects"
          element={<PrivateRoute component={AllProject} />}
        />
        <Route path="/project" element={<PrivateRoute component={Project} />} />
        <Route
          path="/add-user"
          element={<PrivateRoute component={AddUserX} />}
        />
      </Routes>
    </Router>
  );
}
