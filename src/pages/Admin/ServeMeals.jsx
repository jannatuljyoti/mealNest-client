import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ServeMeals = () => {
    const axiosSecure= useAxiosSecure();
    const [search, setSearch] = useState('');
    const[page, setPage] = useState(1);
    const limit =10;

     const {data = {}, refetch} = useQuery({
        queryKey: ['serveMeals', search, page],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/api/admin/meal-requests?search=${search}&page=${page}&limit=${limit}`);
            return res.data;
        }
    });

    const {requests = [], total = 0, totalPages = 1 } = data;

      const handleServe = async(id)=>{
            const confirm = await Swal.fire({
                title: 'Are you sure?',
                text: 'Mark this meal as delivered?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, serve it!'
            });
    
            if(confirm.isConfirmed){
                try{
                    await axiosSecure.patch(`/api/admin/meal-requests/${id}`);
                    Swal.fire('Success', 'Meal marked as delivered.', 'success');
                    refetch();
                }catch(err){
                    console.error(err);
                    Swal.fire('Error', 'Failed to serve meal', 'error');
                }
            }
        };

    return (
         <div className='p-4 bg-gray-200 min-h-screen'>
            <h2 className='text-xl text-center text-gray-700 font-bold mb-4'>Serve Meal</h2>

            <div className='mb-4'>
                <input type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder='Search by user name or email...' 
                className='input input-bordered w-full max-w-md block mx-auto'/>

            </div>


            <div className='overflow-x-auto'>
                <table className='table w-full'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='px-4 text-left py-2'>Meal Title</th>
                            <th className='px-4 text-left py-2'>User Name</th>
                            <th className='px-4 text-left py-2'>User Email</th>
                            <th className='px-4 text-left py-2'>Status</th>
                            <th className='px-4 text-left py-2'>Actions</th>
                        </tr>

                    </thead>

                    <tbody>
                        {requests.map((request)=>(
                            <tr key={request._id}>
                                <td className='px-4 py-2'>{request.mealTitle}</td>
                                <td className='px-4 py-2'>{request.userName || 'N/A'}</td>
                            
                                <td className='px-4 py-2'>{request.userEmail}</td>

                                <td>
                                    <span className={`badge ${request.status === 'delivered' ? 'badge-success' : 'badge-warning'}`}>
                                        {request.status}
                                    </span>
                                </td>

                                <td>
                                    {request.status !== 'delivered' && (
                                       
                                       <button
                                    className='btn btn-sm text-white bg-[#0c6c7c]'
                                    onClick={()=> handleServe(request._id)}>
                                       Serve
                                    </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan='5' className='text-center py-6 text-gray-500'>No meal requests Found</td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

            <div className="flex justify-center mt-4 space-x-2">
  {[...Array(totalPages).keys()].map((num) => (
    <button
      key={num}
      onClick={() => setPage(num + 1)}
      className={`px-4 py-2 rounded ${
        page === num + 1 ? 'bg-[#0c6c7c] text-white' : 'bg-gray-300'
      }`}
    >
      {num + 1}
    </button>
  ))}
</div>

        </div>
    );
};

export default ServeMeals;