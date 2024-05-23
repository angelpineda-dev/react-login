/* React */
import { useState } from 'react';
/* Libraries */
import { Navigate } from 'react-router';
/* helpers */
import requestData from '../../helpers/request';
/* Components */
import { useAuth } from '../../components/context/Auth/AuthProvider';
/* styles */
import './login.css';

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
        
        if(response.status){
            let { token, user } = await response;
            auth.saveUser(user);
            window.localStorage.setItem('token', JSON.stringify(token));
        }


    }

    if (auth.isAuthenticated) {
        return <Navigate to="/"/>
    }

  return (
    <div className='login'>

          <h2 className='login__title'>Login</h2>

          <form onSubmit={onSubmit} className='login__form'>
            <div className='form__item'>
                  <label htmlFor="email" className='form__item-label'>Email</label>
                  <input type="email" name='email' value={formData.email} onChange={(e) => handleInputData(e)} className='form__item-input' required />
            </div>

            <div className='form__item'>
                  <label htmlFor="password" className='form__item-label'>Password</label>
                  <input type="password" name='password' value={formData.password} onChange={(e) => handleInputData(e)} className='form__item-input' required />
            </div>

            <div className='form__item'>
                  <a href="/auth/register">Signup</a>
                  <input type="submit" value="Login" className='form__item-input' />
            </div>
          </form>
    </div>
  )
}

export default Login