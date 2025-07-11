import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const AddMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Upload image to ImgBB
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgbbUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;
      const res = await axios.post(imgbbUrl, formData);

      if (res.data.success) {
        const imageUrl = res.data.data.url;

        const newMeal = {
          title: data.title,
          category: data.category,
          image: imageUrl,
          ingredients: data.ingredients,
          description: data.description,
          price: parseFloat(data.price),
          postTime: data.postTime,
          distributorName: user?.displayName,
          distributorEmail: user?.email,
          rating: 0,
          likes: 0,
          reviews_count: 0,
        };

        // Save to DB
        const result = await axiosSecure.post('/api/meals', newMeal);

        if (result.data.insertedId) {
          Swal.fire('Meal added successfully!', '', 'success');
          reset();
        }
      } else {
        throw new Error('Image upload failed!');
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to add meal', 'error');
    }
  };

  return (
    <div className="p-6 bg-base-200 rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">Meal Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select {...register('category', { required: true })} className="select select-bordered w-full">
            <option value="">Select Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          {errors.category && <p className="text-red-500">Category is required</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label className="label">Ingredients (comma separated)</label>
          <input
            type="text"
            {...register('ingredients', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price (৳)</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Post Time */}
        <div>
          <label className="label">Post Time</label>
          <input
            type="datetime-local"
            {...register('postTime', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Upload Meal Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Distributor Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Distributor Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">Distributor Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        <button type="submit" className="btn bg-[#ec644b] text-white w-full mt-4">
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
