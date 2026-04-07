import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ADMIN_EMAILS = ['admin@plantshop.bd'];

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;