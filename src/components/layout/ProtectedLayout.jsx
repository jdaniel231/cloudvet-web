import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';
import authService from '../../services/authService';

const ProtectedLayout = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedLayout;