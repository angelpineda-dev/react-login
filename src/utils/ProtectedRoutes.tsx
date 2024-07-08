import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/Auth/AuthProvider';
import { useEffect, useState } from 'react';


const ProtectedRoutes = () => {
    const { getUser } = useAuth();

  return (
      getUser()?.rol === 'ADMIN_ROLE' ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoutes;