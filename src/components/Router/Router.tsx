import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoutes from '../../utils/ProtectedRoutes';

import App from '../../App';
import Dashboard from '../../pages/dashboard/Dashboard';
import Home from '../../pages/home/Home';
import Login from '../../pages/auth/Login';
import Products from '../../pages/products/Products';
import Register from '../../pages/auth/Register';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="products/:category" element={<Products />} />
                    
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                

                <Route path="*" element={<h2>404 - Not Found</h2>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router