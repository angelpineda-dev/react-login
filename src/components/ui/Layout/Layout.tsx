import { useAuth } from '../../context/Auth/AuthProvider';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
    const { isAdmin } = useAuth();

    return (
        <>
            <Navbar />

            <div className={`h-full ${isAdmin ? 'flex' : ''}`}>
                { isAdmin && (<Sidebar />) }

                <div className="w-full p-2">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout