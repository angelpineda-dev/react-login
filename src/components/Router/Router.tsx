import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../../pages/home/Home';
import Register from '../../pages/auth/Register';
import Login from '../../pages/auth/Login';
import ProtectedRoutes from '../../utils/ProtectedRoutes';

const Router = () => {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />

				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<Home />} />
				</Route>

				<Route path="*" element={<h2>404 - Not Found</h2>} />
			</Routes>
		</BrowserRouter>
  );
}

export default Router