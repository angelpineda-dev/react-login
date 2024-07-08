
import { Link } from "react-router-dom"

import { useGlobal } from "../context/GlobalContext/GlobalProvider"
import { useAuth } from "../context/Auth/AuthProvider";

const Navbar = ({ children }) => {
    const { getCategories } = useGlobal();
    const { isAdmin, isAuthenticated, logout } = useAuth();

    return (
        <>
            <nav className={`flex justify-between p-2 ${isAdmin ? 'bg-slate-800' : 'bg-orange-800'}`}>
                <Link to="/" className="text-white">Logo</Link>
                <ul className='flex justify-around  w-[50%]'>
                    {

                        getCategories().map((category) =>
                        (<li key={category.id}>
                            <Link
                                to={`/category/${category.name.toLowerCase()}`}
                                state={{
                                    category: category
                                }}
                                className="text-white"
                            > {category.name}
                            </Link>
                        </li>))
                    }

                </ul>

                <div className='flex gap-2'>
                    {
                        isAuthenticated 
                        ? <button onClick={logout} className='bg-white rounded-sm text-black p-1'>Logout</button> 
                        : <Link to="/login" className="px-2 rounded text-white">Login</Link>
                    }
                    
                    <button className="px-2 rounded">Cart</button>
                </div>
            </nav>

            <div className={`h-full ${isAdmin ? 'flex' : ''}` }>
                {
                    isAdmin
                        ? <aside className="bg-slate-800 p-2">
                            <ul>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/categories">Categorias</Link></li>
                            </ul>
                        </aside>
                        : <></>
                }

                <div className="w-full">
                    {children}
                </div>
            </div>

        </>
    )
}

export default Navbar