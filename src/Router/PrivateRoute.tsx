import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/Navbar';

const useAuth = () => {
  const user = localStorage.getItem('token');
  if (user) return true;

  return false;
};

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const isAuthenticated = useAuth();
  if (isAuthenticated)
    return (
      <>
        <NavBar />
        <Component />
      </>
    );
  return <Navigate to="/login" />;
};

export default PrivateRoute;
