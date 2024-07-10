import { Outlet, Navigate } from 'react-router-dom';

import Layout from '../components/ui/Layout/Layout';
import { useAuth } from '../components/context/Auth/AuthProvider';


const ProtectedRoutes = () => {
    const { isAdmin } = useAuth();

  return (
      isAdmin 
      && <Layout>
            <Outlet />
        </Layout> 
    )
}

export default ProtectedRoutes;