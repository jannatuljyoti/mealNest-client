import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const RequestMeals = () => {
    const {user}=useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;


    const{data = {}, refetch} = useQuery({
        queryKey:['meal-requests', user?.email, currentPage],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/requests?email=${user.email}&page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        }
    });

    const {requests = [], totalPages= 1} =data;

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
        <div className='p-7 bg-base-100'>
            <h2 className='text-2xl  text-center font-bold mb-5'>Requested Meals</h2>
            <div className='overflow-x-auto bg-base-100'>
                <table className='table w-full'>
                    <thead className='bg-base-100'>
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
                                    className='bg-[#ec644b] px-4 py-2 rounded text-white hover:bg-amber-700'>
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
            <div className='flex justify-center mt-6 gap-2'>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-cyan-900 text-white' : 'bg-base-100 text-gray-700'}`}
    >
      {i + 1}
    </button>
  ))}
</div>

            
        </div>
    );
};

export default RequestMeals;