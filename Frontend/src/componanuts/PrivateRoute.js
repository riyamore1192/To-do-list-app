import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    alert('Please register and login first to access this page.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
