/* React */
import { useState } from 'react';
/* Libraries */
import { Navigate } from 'react-router';
/* helpers */
import requestData from '../../helpers/request';
/* Components */
import { useAuth } from '../../components/context/Auth/AuthProvider';
/* Styles */
import "./login.scss";

import Form from '../../components/Form/Form';
import { FormInput } from '../../components/Form/FormInput';
import { useForm } from 'react-hook-form';

interface ILogin {
    email: string;
    password: string;
}

const Login = () => {
    const auth = useAuth();
    const { register, handleSubmit, formState } = useForm();

    const formFields = {
        email: register('email', {
            required:{
                value: true,
                message: "Field required"
            }
        }),
        password: register('password', {
            required: {
                value: true,
                message: "Field required"
            }
        })
    }
    
    async function onSubmit(data:any) {

        let response = await requestData({ method: 'post', endpoint: '/auth/login', data });

        if (response.status) {
            let { token, user } = await response;
            auth.saveUser(user);
            window.localStorage.setItem('token', JSON.stringify(token));
        }
    }

    if (auth.isAuthenticated) {

        if (auth.isAdmin) {
            return <Navigate to='/dashboard' />
        }else{
            return <Navigate to="/"/>
        }
    }

  return (
    <article className='box-wrap'>

          <div className='login'>

              <Form 
                title='Login' 
                onSubmit={handleSubmit(onSubmit)}
                sideAction={<a href="/register">Signup</a>}
                >
                    <>
                      <FormInput
                          label='Email'
                          name='email'
                          type='text'
                          placeholder='Email...'
                          register={formFields.email}
                          formState={formState}
                      />

                      <FormInput
                          label='Password'
                          name='password'
                          type='password'
                          placeholder='Password...'
                          register={formFields.password}
                          formState={formState}
                      />
                      </>
              </Form>
          </div>
    </article>
  )
}

export default Login