import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const {register:formRegister, handleSubmit,reset, formState:{errors}} = useForm();
    const {createUser, updateUserProfile, googleSignIn} = useAuth();
    const navigate = useNavigate();

    const onSubmit = async(data)=>{
        const {name,email,password,photoURL} = data;
        try{
            const result = await createUser(email,password);
            await updateUserProfile(name,photoURL);

            const saveUser={
                name,
                email,
                photoURL,
                badge: 'Bronze',
                role: 'user',
            };

            await axios.post('/api/users',saveUser);
            Swal.fire('Register Successful', '', 'success');
            reset();
            navigate('/');
        }catch(err){
            Swal.fire('Error', err.message, 'error')
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

            await axios.post('/api/users', saveUser);
            Swal.fire('Google Sign In Successful', '', 'success');
            navigate('/');
        }catch(err){
            Swal.fire('Error', err.message, 'error');
        }
    };





    return (
        <div className='bg-base-100 p-6 rounded-lg  shadow-md '>
            <h2 className='text-2xl font-semibold text-center mb-4'>Register Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

                {/* name */}
                            <label className="label font-bold text-xl">Name:</label>
                 <input 
                  {...formRegister('name')}
                   className="input input-bordered w-full" placeholder="name"required/> 

                {/* email */}
                 <label className="label font-bold text-xl">Email:</label>
                 <input type="email"
                  {...formRegister('email')}
                   className="input input-bordered w-full" placeholder="Email"required/> 


            {/* password */}
          <label className="label font-bold text-xl">Password:</label>       
          <input type="password" 
          {...formRegister('password',{
            required:true,
            minLength: 6 })}
           className="input input-bordered w-full" placeholder="Password" />
           {
            errors.password?.type=== 'required' && (<p className='text-red-600'>Password is required</p>
           )}
           {
            errors.password?.type=== 'minLength' && (<p className='text-red-600'>Password must be at least 6 characters</p>
           )}

           {/* photoURL */}
            <label className="label font-bold text-xl">PhotoURL:</label>
                 <input 
                  {...formRegister('photoURL')}
                   className="input input-bordered w-full" placeholder="photoURL"required/> 

           <p className='text-xl mb-5'>Forget Password?</p>

           <button type='submit' className='btn bg-[#ec644b]  w-full text-white'>Register</button>


            </form>

            <div className='divider'>OR</div>
            <button onClick={handleGoogle} className='btn  text-white bg-[#0c6c7c] w-full'>Continue with <FcGoogle className='w-5 h-5'/>Google</button>

            <p className='font-semibold text-center mt-4'>Already Have An Account? <Link to="/login" className='text-[#ec644b]'>Login</Link></p>
        </div>
    );
};

export default Register;