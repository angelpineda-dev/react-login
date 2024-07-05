import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Register from '../../pages/auth/Register';
import Login from '../../pages/auth/Login';
import ProtectedRoutes from '../../utils/ProtectedRoutes';
import Category from '../../pages/category/Category';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="category/:name" element={<Category/>} />
                {/* TODO:
                  * Categories
                  * Products
                */}

                {/* TODO: group by auth/name */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoutes />}>
                    {/* dashboard */}
                </Route>

                <Route path="*" element={<h2>404 - Not Found</h2>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router