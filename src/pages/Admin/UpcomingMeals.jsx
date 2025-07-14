import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Modal from 'react-modal'

const UpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] =useState(false);

    const {register, handleSubmit, reset} = useForm();

    // Fetch upcoming meals
    const {data: meals=[], refetch} =useQuery({
        queryKey:['upcoming-meals'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/api/upcoming-meals');
            return res.data;
        },
    });

    // add new upcoming meal
    const onSubmit = async(data)=>{
        data.postTime = new Date(data.postTime).toISOString();
        data.likes=0;


        try{
            const res = await axiosSecure.post('/api/upcoming-meals',data);
            if(res.data.insertedId){
                toast.success('Upcoming meal added!');
                reset();
                setIsModalOpen(false);
                refetch();
            }
        }catch(err){
            toast.error('Failed to add meal');
        }
    };

      // Publish meal to main collection
      const handlePublish = async(id)=>{
        try{
            const res = await axiosSecure.post(`/api/publish-upcoming/${id}`);
            if(res.data.result.insertedId){
                toast.success('Meal published');
                refetch();
            }
        }catch(err){
            toast.error('Failed to publish');
        }
      }

    return (
        <div className='p-7'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-2xl font-bold text-gray-600'>Upcoming Meals</h2>

                <button
                onClick={()=> setIsModalOpen(true)}
                className='bg-[#0c6c7c] text-white px-5 py-3 rounded hover:bg-blue-600'>
                    Add Upcoming Meal
                </button>

            </div>

        {/* Table */}
        <div className='overflow-x-auto'>
            <table className='table w-full'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th>Title</th>
                        <th>Likes</th>
                        <th>Post Time</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>
                    {meals.map((meal)=>(
                        <tr key={meal._id}>
                            <td>{meal.title}</td>
                            <td>{meal.likes}</td>
                            <td>{new Date(meal.postTime).toLocaleString()}</td>
                            <td>
                                <button onClick={()=> handlePublish(meal._id)}
                                    className='bg-[#ec644b] text-white px-4 py-2 rounded hover:bg-amber-500'>
                                    Publish
                                </button>
                            </td>
                        </tr>
                    ))}
                    {meals.length === 0 && (
                        <tr>
                            <td colSpan="4" className='text-center py-4 text-gray-500'>
                                Upcoming meals not found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>

        {/* modal for adding upcoming meal */}
        <Modal
        isOpen={isModalOpen}
        onRequestClose={()=> setIsModalOpen(false)}
        contentLabel="Add Upcoming Meal"
        className="bg-white p-7  w-full max-w-4xl mx-auto mt-18 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start">

             <h3 className='text-xl font-semibold mb-5'>Add Upcoming Meal</h3>

        <form onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-5'>

          <input
          type='text'
          {...register('title', {required:true})}
          placeholder='Meal title'
          className='input input-bordered'/>  

          <input
          type='text'
          {...register('category', {required:true})}
          placeholder='Category (Breakfast/Lunch/Dinner)'
          className='input input-bordered'/>

          <input
          type='text'
          {...register('image', {required:true})}
          placeholder='Image URL'
          className='input input-bordered'/>  

          <input
          type='text'
          {...register('ingredients', {required:true})}
          placeholder='Ingredients'
          className='input input-bordered'/> 

          <textarea
          type='text'
          {...register('description', {required:true})}
          placeholder='Description'
          className='input input-bordered'/> 

          <input
          type='number'
          {...register('price', {required:true})}
          placeholder='Price'
          className='input input-bordered'/> 

          <input
          type='datetime-local'
          {...register('postTime', {required:true})}
          className='input input-bordered'/> 

          <input
          type='text'
          {...register('distributorName')}
          defaultValue="Admin Name"
          readOnly
          className='input input-bordered'/>

           <input
          type='email'
          {...register('distributorEmail')}
          defaultValue="admin@example.com"
          readOnly
          className='input input-bordered'/>


        <div className='flex gap-4 justify-end mt-5'>

            <button
            type='button'
            onClick={()=> setIsModalOpen(false)}
             className='bg-gray-400 px-5 py-3 rounded text-white hover:bg-gray-500 '>
                Cancel
            </button>

            <button
            type='submit'
            className='bg-green-600 px-5 py-3 rounded text-white hover:bg-green-700'>
                Add Meal
            </button>
        
        
        </div>  

        </form>
            </Modal>

       
        </div>
    );
};

export default UpcomingMeals;