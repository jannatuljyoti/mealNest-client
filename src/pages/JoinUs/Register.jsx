import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router'; // ✅ fix: react-router-dom
import Swal from 'sweetalert2';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { register: formRegister, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  // ✅ Upload image to ImgBB
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      console.log("✅ ImgBB upload response:", res.data);

      if (res.data.success) {
        return res.data.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("❌ ImgBB Upload Error:", err);
      throw err;
    }
  };

  // ✅ Register submit
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    console.log("📥 Register form submitted:", data);

    try {
      const result = await createUser(email, password);
      console.log("✅ Firebase user created:", result.user);

      let photoURL = '';
      if (imageFile) {
        console.log("📤 Uploading image...");
        photoURL = await handleImageUpload(imageFile);
        console.log("✅ Image uploaded:", photoURL);
      }

    //   update firebase profile
      await updateUserProfile(name, photoURL);
      console.log("✅ Firebase profile updated");

    //   save user to mongodb
      const saveUser = {
        name,
        email,
        photoURL,
        badge: 'Bronze',
        role: 'user',
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, saveUser);
      console.log("✅ User saved to MongoDB");

      Swal.fire('Register Successful', '', 'success');
      reset();
      navigate('/');
    } catch (err) {
      console.error("❌ Registration error:", err);
      Swal.fire('Error', err.message, 'error');
    }
  };

  // ✅ Google Login
  const handleGoogle = async () => {
    try {
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
      Swal.fire('Google Sign In Successful', '', 'success');
      navigate('/');
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className='bg-base-100 p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-center mb-4'>Register Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

        {/* Name */}
        <label className="label font-bold text-xl">Name:</label>
        <input type='text' {...formRegister('name')} className="input input-bordered w-full" placeholder="Name" required />

        {/* Email */}
        <label className="label font-bold text-xl">Email:</label>
        <input type="email" {...formRegister('email')} className="input input-bordered w-full" placeholder="Email" required />

        {/* Password */}
        <label className="label font-bold text-xl">Password:</label>
        <input type="password"
          {...formRegister('password', {
            required: true,
            minLength: 6
          })}
          className="input input-bordered w-full" placeholder="Password" />
        {
          errors.password?.type === 'required' && (<p className='text-red-600'>Password is required</p>)
        }
        {
          errors.password?.type === 'minLength' && (<p className='text-red-600'>Password must be at least 6 characters</p>)
        }

        {/* Profile Picture */}
        <label className="label font-bold text-xl">Profile Picture:</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept='image/*'
          className="file-input file-input-bordered w-full"
          required
        />

        <p className='text-xl mb-5'>Forget Password?</p>
        <button type='submit' className='btn bg-[#ec644b] w-full text-white'>Register</button>
      </form>

      <div className='divider'>OR</div>
      <button onClick={handleGoogle} className='btn text-white bg-[#0c6c7c] w-full'>
        Continue with <FcGoogle className='w-5 h-5 ml-2' /> Google
      </button>

      <p className='font-semibold text-center mt-4'>Already Have An Account? <Link to="/login" className='text-[#ec644b]'>Login</Link></p>
    </div>
  );
};

export default Register;
