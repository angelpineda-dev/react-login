import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Register from '../../pages/auth/Register';
import Login from '../../pages/auth/Login';
import ProtectedRoutes from '../../utils/ProtectedRoutes';
import Category from '../../pages/category/Category';
import Dashboard from '../../pages/dashboard/Dashboard';
import App from '../../App';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="category/:name" element={<Category />} />
                    
                </Route>



                {/* TODO: group by auth/name */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoutes />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/categories"
                        element={<h2>Categories</h2>}
                    />
                </Route>

                <Route path="*" element={<h2>404 - Not Found</h2>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router