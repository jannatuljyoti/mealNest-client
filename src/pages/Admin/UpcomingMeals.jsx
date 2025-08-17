import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal'

const UpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] =useState(false);
    const [page, setPage] = useState(1);
    const limit=10;

    const {register, handleSubmit, reset} = useForm();

    // Fetch upcoming meals
    const {data = {}, refetch, isLoading} =useQuery({
        queryKey:['upcoming-meals',page],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/upcoming-meals?page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const meals = data.meals || [];
    const totalPages = data.totalPages || 1;

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
    const handlePublish = async (meal) => {
  // ✅ Frontend validation: check if likes < 10
  if (meal.likes < 10) {
    return toast.error("Need at least 10 likes to publish");
  }

  try {
    const res = await axiosSecure.post(`/api/publish-upcoming/${meal._id}`);

    if (res.data.result?.insertedId) {
      toast.success("Meal published");
      refetch();
    }
  } catch (err) {
    console.log("Publish error:", err);

    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong while publishing";

    toast.error(message);
  }
};


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

    return (
        <div className='p-7 bg-base-100'>

            
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
           
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-2xl font-bold '>Upcoming Meals</h2>

                <button
                onClick={()=> setIsModalOpen(true)}
                className='bg-[#0c6c7c] text-white px-5 py-3 rounded hover:bg-cyan-600'>
                    Add Upcoming Meal
                </button>

            </div>

        {/* Table */}
        <div className='overflow-x-auto'>
            <table className='table w-full'>
                <thead className=''>
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
                            <td >{meal.title}</td>
                            <td >{meal.likes}</td>
                            <td >{new Date(meal.postTime).toLocaleString()}</td>
                            <td>
                               <button
  onClick={() => handlePublish(meal)}
  className="bg-[#ec644b] text-white px-4 py-2 rounded hover:bg-amber-500"
>
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

        <div className="flex justify-center gap-2 mt-6">
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setPage(i + 1)}
      className={`px-4 py-2 border rounded ${
        page === i + 1 ? 'bg-[#0c6c7c] text-white' : 'bg-white'
      }`}
    >
      {i + 1}
    </button>
  ))}
</div>


        {/* modal for adding upcoming meal */}
        <Modal
        isOpen={isModalOpen}
        onRequestClose={()=> setIsModalOpen(false)}
        contentLabel="Add Upcoming Meal"
        className="bg-white p-7  w-full max-w-4xl mx-auto mt-18 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start">

             <h3 className='text-xl text-[#ec644b] font-semibold mb-5'>Add Upcoming Meal</h3>

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
          className='input  input-bordered'/>

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
             className='bg-[#ec644b] px-5 py-3 rounded text-white hover:bg-amber-900 '>
                Cancel
            </button>

            <button
            type='submit'
            className='bg-[#0c6c7c] px-5 py-3 rounded text-white hover:bg-cyan-700'>
                Add Meal
            </button>
        
        
        </div>  

        </form>
            </Modal>

       
        </div>
    );
};

export default UpcomingMeals;