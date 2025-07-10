import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signIn, googleSignIn} = useAuth();
    const navigate = useNavigate();

    const onSubmit = async(data)=>{
        try{
            await signIn(data.email, data.password);
            Swal.fire('Login Successful', '', 'success');
            navigate('/');
        } catch (err){
            Swal.fire('Login Failed', err.message, 'error');
        }
    };

    const handleGoogle = async()=>{
        try{
            const result = await googleSignIn();
            const user = result.user;

            const saveUser = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                badge: 'Bronze',
                role: 'user',
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, saveUser);

            Swal.fire('Google Login Successful', '', 'success');
            navigate('/');
        }catch(err){
            Swal.fire('Google Login Failed', err.message, 'error');
        }
    };


    return (
        <div className='bg-base-100 p-6 rounded-lg  shadow-md '>
            <h2 className='text-2xl font-semibold text-center mb-4'>Login Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                 <label className="label font-bold text-xl">Email:</label>
                 <input type="email"
                  {...register('email')}
                   className="input input-bordered w-full" placeholder="Email"required/> 

          <label className="label font-bold text-xl">Password:</label>       
          <input type="password" 
          {...register('password',{
            required:true,
            minLength: 6 })}
           className="input input-bordered w-full" placeholder="Password" />
           {
            errors.password?.type=== 'required' && (<p className='text-red-600'>Password is required</p>
           )}
           {
            errors.password?.type=== 'minLength' && (<p className='text-red-600'>Password must be at least 6 characters</p>
           )}

           <p className='text-xl mb-5'>Forget Password?</p>

           <button type='submit' className='btn bg-[#ec644b]  w-full text-white'>Login</button>


            </form>

            <div className='divider'>OR</div>
            <button onClick={handleGoogle} className='btn  text-white bg-[#0c6c7c] w-full'>Continue with <FcGoogle className='w-5 h-5'/>Google</button>
            <p className='font-semibold text-center mt-4'>Don't Have An Account? <Link to="/register" className='text-[#ec644b]'>Register</Link></p>
        </div>
    );
};

export default Login;