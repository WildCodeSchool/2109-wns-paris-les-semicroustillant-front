import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <>
        <AppRouter />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </>
  );
}

export default App;
