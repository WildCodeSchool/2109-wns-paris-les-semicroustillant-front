import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AppRouter from './Router';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
}

export default App;
