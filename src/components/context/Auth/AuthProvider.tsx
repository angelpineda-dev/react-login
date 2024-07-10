/* React */
import { useState, useEffect, createContext, useContext } from 'react';

import requestData from '../../../helpers/request';
import { IUser } from '../../../interfaces/models';


interface IAuthContext {
    isAuthenticated: boolean;
    getUser: () => IUser;
    saveUser: (user: IUser) => void;
    isAdmin: boolean;
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
    const [isAdmin, setIsAdmin] = useState(false);

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
                    setIsAuthenticated(true);

                    if (response?.user?.rol === 'ADMIN_ROLE') {
                        setIsAdmin(true)
                    }else{
                        setIsAdmin(false)
                    }

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
        setIsAuthenticated(true);

        if (user?.rol === 'ADMIN_ROLE') {
            setIsAdmin(true)
        }else{
            setIsAdmin(false)
        }
    }

    function getUser() {
        return user;
    }

    function logout() {
        setLoading(true);

        setUser(undefined)
        setIsAuthenticated(false);
        window.localStorage.removeItem('token');

        
        setTimeout(() => {
            setLoading(false)
            window.location.replace('/');
        }, 200);
    }

    return (
    <AuthContext.Provider value={{
        isAuthenticated,
        getUser,
        saveUser,
        isAdmin,
        logout
    }}>
        { loading 
            ? <h2>Loading...</h2> 
            : children
        }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);