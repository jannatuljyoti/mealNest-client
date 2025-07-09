import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {register, handleSubmit,formState:{errors}} = useForm();
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                 <input type="email"
                  {...register('email')}
                   className="input" placeholder="Email" /> 

                 
          <input type="password" 
          {...register('password',{
            required:true,
            minLength: 6 })}
           className="input" placeholder="Password" />
           {
            errors.password?.type=== 'required' && <p className='text-red-600'>Password is required</p>
           }
           {
            errors.password?.type=== 'minLength' && <p className='text-red-600'>Password is required</p>
           }
            </form>
        </div>
    );
};

export default Login;