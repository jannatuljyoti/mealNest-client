import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const UpcomingMeal = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data:meals = [], isLoading, refetch} = useQuery({
        queryKey: ['upcoming-meals'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/api/upcoming-meals');
            return res.data;
        },
    });


    const handleLike = async (meal)=>{
        if(!user){
            toast.error('Login required to like!');
            return;
        }

        try{
            const res = await axiosSecure.post('/api/upcoming-meals/like',{
                mealId: meal._id,
                userEmail: user.email,
                badge: user?.badge || 'bronze',
            });

            if(res.data.message === 'Liked successfully'){
                toast.success('You liked the meal');
                refetch();
            }
        }catch(error){
            toast.error(error.response?.data?.message || 'Failed to like');
        }
    };

    if(isLoading) return <p className='text-center py-10'>Loading...</p>

    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <h2 className='text-2xl font-bold text-center mb-7'>Upcoming Meals</h2>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                {meals.map((meal)=>(
                    <div
                    key={meal._id}
                    className='border p-5 rounded-lg shadow-md bg-white flex flex-col items-center'>

                        <img src={meal.image} alt={meal.title} className='w-full h-40 object-cover rounded-md mb-4' />

                        <h3 className='text-lg font-bold mb-1'>{meal.title}</h3>
                        <p className='text-sm mb-1'>{meal.description?.slice(0,60)}...</p>
                        <p className='text-sm text-gray-600 mb-2'>Likes: {meal.likes || 0}</p>

                        <button 
                        onClick={()=>handleLike(meal)}
                        className='btn bg-[#0c6c7c] hover:bg-blue-600 text-white mt-auto'>Like</button>

                    </div>
                ))}

            </div>
            
        </div>
    );
};

export default UpcomingMeal;