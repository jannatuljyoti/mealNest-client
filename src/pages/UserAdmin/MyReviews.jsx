import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const MyReviews = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const [editingId, setEditingId] = useState(null);
    const [newReview, setNewReview]=useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

     const{data, refetch} = useQuery({
        queryKey:['my-reviews', user?.email,page],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/reviews?email=${user.email}&page=${page}&limit=${limit}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const {reviews = [], total=0, totalPages = 1} = data || {};

    const handleDelete = async(id)=>{
        try{
            await axiosSecure.delete(`/api/reviews/${id}`);
            toast.success('Review Deleted');
            refetch();
        }catch{
            toast.error('Failed to delete');
        }
    };


    const handleEdit = async(id)=>{
        try{
            await axiosSecure.patch(`/api/reviews/${id}`,{
                reviewText: newReview,
            });
            toast.success('Review updated');
            setEditingId(null);
            setNewReview('');
            refetch();
        }catch{
            toast.error('Failed to update');
        }
    };


    return (
          <div className='p-4 md:p-7 bg-base-100'>
            <h2 className='text-xl  md:text-2xl font-bold mb-5 text-center  '>My Reviews</h2>
            <div className='overflow-x-auto bg-base-100'>
                <table className='table w-full text-sm md:text-base'>
                    <thead className='bg-base-100'>
                        <tr>
                            <th>Meal </th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Actions</th>
                            
                        </tr>

                    </thead>

                    <tbody>
                        {reviews.map((r)=>(
                            <tr key={r._id}>
                                <td>{r.mealTitle}</td>
                                <td>{r.likes || 0}</td>
                                <td>
                                    {editingId === r._id?(
                                        <input
                                        type='text'
                                        value={newReview}
                                        onChange={(e)=> setNewReview(e.target.value)}
                                        className='input input-bordered w-full max-w-xs'/>
                                    ):(
                                       <span className='block max-w-xs break-words'>{r.review}</span>
                                    )}
                                </td>
                                <td className='flex gap-3'>

                                    {editingId=== r._id? (
                                       <div className='flex flex-col sm:flex-row gap-2'>
                                        <button 
                                        onClick={()=>handleEdit(r._id)}
                                        className='btn btn-sm btn-success'>
                                            Save
                                        </button>

                                        <button
                                        onClick={()=>setEditingId(null)}
                                        className='btn btn-sm btn-ghost'>
                                            Cancel
                                        </button>
                                       </div>
                                    ):(
                                     <div className='flex flex-col sm:flex-row gap-2'>
                                            <button onClick={()=>{
                                            setEditingId(r._id);
                                            setNewReview(r.review);
                                        }} className='btn bg-green-700 text-white btn-sm '>
                                            Edit
                                        </button>

                                        <button onClick={()=> handleDelete(r._id)}
                                            className='btn btn-sm text-white bg-[#0c6c7c] '>
                                            Delete
                                        </button>

                                        <Link to={`/meal/${r.mealId}`} className='btn btn-sm text-white bg-[#ec644b]'>
                                        View Meal
                                        </Link>
                                        
                                        </div>
                                    )}
                                </td>

                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan='5' className='text-center text-gray-500 py-5'>
                                    You haven't reviewed any meals.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

            <div className="flex justify-center mt-6">
  <div className="join">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`join-item btn btn-sm ${page === i + 1 ? 'bg-cyan-900 text-white' : 'btn-outline'}`}
      >
        {i + 1}
      </button>
    ))}
  </div>
</div>

            
        </div>
    );
};

export default MyReviews;