import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const RequestMeals = () => {
    const {user}=useAuth();
    const axiosSecure = useAxiosSecure();


    const{data: requests= [], refetch} = useQuery({
        queryKey:['meal-requests', user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/requests?email=${user.email}`);
            return res.data;
        }
    });

    const handleCancel = async(id)=>{
        try{
            await axiosSecure.delete(`/api/requests/${id}`);
            toast.success('Request cancelled');
            refetch();

        }catch(err){
            toast.error('Failed to cancel request')
        }
    };

    return (
        <div className='p-7'>
            <h2 className='text-2xl text-gray-600 font-bold mb-5'>Requested Meals</h2>
            <div className='overflow-x-auto'>
                <table className='table w-full'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>

                    </thead>

                    <tbody>
                        {requests.map(req=>(
                            <tr key={req._id}>
                                <td>{req.mealTitle}</td>
                                <td>{req.likes}</td>
                                <td>{req.reviews_count || 0}</td>
                                <td>{req.status || 'Pending'}</td>
                                <td>
                                    <button 
                                    onClick={()=> handleCancel(req._id)}
                                    className='bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600'>
                                        cancel
                                    </button>
                                </td>

                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan='5' className='text-center text-gray-500 py-5'>
                                    You haven't requested any meals.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
            
        </div>
    );
};

export default RequestMeals;