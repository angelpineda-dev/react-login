/* React */
import { useState, useEffect, createContext, useContext } from 'react';

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

                setUser(response?.data?.user)
                setIsAuthenticated(true)

            } catch (error) {
                console.error(error)
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
    }

    return (
    <AuthContext.Provider value={{
        isAuthenticated,
        getUser,
        saveUser,
        logout
    }}>
        {loading ? <h2>Loading...</h2> :children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);