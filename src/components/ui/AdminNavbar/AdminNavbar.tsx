
import { useAuth } from '../../context/Auth/AuthProvider'
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    const { logout } = useAuth();

  return (
    <nav className='bg-black text-white flex justify-between items-center p-2'>
        <Link to="/dashboard" >Dashboard</Link>
        <button onClick={logout} className='bg-white rounded-sm text-black p-1'>Logout</button>
    </nav>
  )
}

export default AdminNavbar