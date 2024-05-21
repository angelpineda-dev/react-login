import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/Auth/AuthProvider';


const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/auth/login"/>
  )
}

export default ProtectedRoutes;