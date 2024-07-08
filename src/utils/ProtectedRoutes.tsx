import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/Auth/AuthProvider';
import { useEffect, useState } from 'react';
import Navbar from '../components/ui/Navbar';


const ProtectedRoutes = () => {
    const { isAdmin } = useAuth();

  return (
      isAdmin ? <Navbar > <Outlet /> </Navbar> : <Navigate to="/" />
    )
}

export default ProtectedRoutes;