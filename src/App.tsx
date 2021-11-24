import React from 'react';
import './App.css';

import AllUsers from './components/AllUsers';
import DeleteUserX from './components/DeleteUserX';
import AddUserX from './components/AddUserX';

function App(): JSX.Element {
  return (
    <div>
      Hello world
      <div>
        <AllUsers />
        <DeleteUserX />
        <AddUserX />
      </div>
    </div>
  );
}

export default App;
