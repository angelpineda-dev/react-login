import { useState } from "react";
import requestData from "../../helpers/request";
import { useAuth } from "../../components/context/Auth/AuthProvider";
import { Navigate } from "react-router";

interface IRegister {
    name:string;
    email: string;
    password: string;
}

const Register = () => {
    const auth = useAuth();
    const [formData, setFormData] = useState<IRegister>({ name: "", email: "", password: "" });

    async function onSubmit(e:React.FormEvent){
        e.preventDefault();

        let response = await requestData({ method: 'post', endpoint: '/auth/register', data: formData });

        if (response.status) {
            let { token, user } = await response;
            auth.saveUser(user);
            window.localStorage.setItem('token', JSON.stringify(token));
        }
    }

    function handleInputData(e: React.SyntheticEvent) {

        let { name, value } = e.target as HTMLInputElement;

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/" />
    }

  return (
      <div className='login'>

          <h2 className='login__title'>Signup</h2>

          <form onSubmit={onSubmit} className='login__form'>
              <div className='form__item'>
                  <label htmlFor="name" className='form__item-label'>Name</label>
                  <input type="text" name='name' value={formData.name} onChange={(e) => handleInputData(e)} className='form__item-input' required />
              </div>

              <div className='form__item'>
                  <label htmlFor="email" className='form__item-label'>Email</label>
                  <input type="email" name='email' value={formData.email} onChange={(e) => handleInputData(e)} className='form__item-input' required />
              </div>

              <div className='form__item'>
                  <label htmlFor="password" className='form__item-label'>Password</label>
                  <input type="password" name='password' value={formData.password} onChange={(e) => handleInputData(e)} className='form__item-input' required />
              </div>

              <div className='form__item'>
                  <a href="/auth/login">Login</a>
                  <input type="submit" value="Signup" className='form__item-input' />
              </div>
          </form>
      </div>
  )
}

export default Register