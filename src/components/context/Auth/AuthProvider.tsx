/* React */
import { useState, useEffect, createContext, useContext } from 'react';
import { Navigate } from 'react-router';

import requestData from '../../../helpers/request';
import { IUser } from '../../../interfaces/models';


interface IAuthContext {
    isAuthenticated: boolean;
    getUser: () => IUser;
    saveUser: (user: IUser) => void;
    logout: () => void;
}

interface IAuthProvider {
    children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({children}:IAuthProvider) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
      checkSession();
    }, [])
    
    async function checkSession(){
        const token = localStorage.getItem('token');
        
        if (token) {
            
            try {
                setLoading(true);
                let authorization = JSON.parse(token);

                const response =  await requestData({ 
                    method: 'get', 
                    endpoint:'/auth/me', headers: {
                    Authorization: `${authorization}`
                } })

                if (response?.status) {
                    setUser(response?.user);

                    if (response?.user?.rol == 'ADMIN_ROLE') {
                        setIsAdmin(true)
                    }else{
                        setIsAdmin(false)
                    }
                    setIsAuthenticated(true);
                }else{
                    logout();
                }

            } catch (error) {
                logout()
                console.error(error);
            }finally{
                setLoading(false)
            }

        }

    }

    function saveUser(user:IUser) {
        setUser(user);
        setIsAuthenticated(true)
    }

    function getUser() {
        return user;
    }

    function logout() {
        setUser(undefined)
        setIsAuthenticated(false);
        window.localStorage.removeItem('token');
        
        return <Navigate to="/" /> 
    }

    return (
    <AuthContext.Provider value={{
        isAuthenticated,
        getUser,
        saveUser,
        logout
    }}>
        { loading 
            ? <h2>Loading...</h2> 
            : <div className={`${isAdmin ? 'flex' : '' } h-full`} > 
                { user?.rol === 'ADMIN_ROLE' && 
                <aside className='w-[250px] bg-blue-950'> soy un aside </aside>}
                <div className={isAdmin ? 'w-full' : ''}>
                    {children}
                </div>
             </div>
        }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);