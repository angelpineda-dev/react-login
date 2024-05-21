/* React */
import { useState } from 'react';
/* Libraries */

/* helpers */
import requestData from '../../helpers/request';
import { useAuth } from '../../components/context/Auth/AuthProvider';
import { Navigate } from 'react-router';

interface ILogin {
    email: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<ILogin>({email: "", password: ""});
    const auth = useAuth();
    
    
    function handleInputData(e: React.SyntheticEvent) {
        
        let { name, value } = e.target as HTMLInputElement;
        
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        let response = await requestData({method:'post', endpoint: '/auth/login', data: formData});
        let { token, user } = await response;

        auth.saveUser(user);
        window.localStorage.setItem('token', JSON.stringify(token));

    }

    if (auth.isAuthenticated) {
        return <Navigate to="/"/>
    }

  return (
    <div>
          <h2>Login</h2>

          <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' value={formData.email} onChange={(e) => handleInputData(e)}/>

            <label htmlFor="password">Password</label>
              <input type="password" name='password' value={formData.password} onChange={(e) => handleInputData(e)} />

            <input type="submit" value="Login" />
          </form>
    </div>
  )
}

export default Login