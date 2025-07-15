import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {data: reviews = [], refetch} = useQuery({
        queryKey: ['adminAllReviews'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/api/admin/all-reviews');
            return res.data;
        }
    });


    const handleDelete = async(id)=>{
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This review will be deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });

        if(confirm.isConfirmed){
            try{
                await axiosSecure.delete(`/api/reviews/${id}`);
                Swal.fire('Deleted!', 'Review has been deleted.', 'success');
                refetch();
            }catch(error){
                console.error(error);
                Swal.fire('Error', 'Failed to delete review', 'error');
            }
        }
    };

    return (
        <div className='p-4 bg-gray-200 min-h-screen'>
            <h2 className='text-xl text-center text-gray-600 font-bold mb-4'>All Reviews</h2>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-100 text-sm text-gray-700'>
                        <tr>
                            <th className='px-4 text-left py-2'>Meal Title</th>
                            <th className='px-4 text-left py-2'>Likes</th>
                            <th className='px-4 text-left py-2'>Reviews Count</th>
                            <th className='px-4 text-left py-2'>Review</th>
                            <th className='px-4 text-left py-2'>User Email</th>
                            <th className='px-4 text-left py-2'>Actions</th>
                        </tr>

                    </thead>

                    <tbody className='text-sm divide-y divide-gray-200'>
                        {reviews.map((review)=>(
                            <tr key={review._id} className='border-t'>
                                <td className='px-4 py-2'>{review.mealTitle}</td>
                                <td className='px-4 py-2'>{review.likes}</td>
                                <td className='px-4 py-2'>{review.reviews_count}</td>
                                <td className='px-4 py-2'>{review.review}</td>
                                <td className='px-4 py-2'>{review.userEmail}</td>
                                <td className='px-4 py-2 space-x-2'>
                                    <button
                                    className='btn btn-xs md:btn-sm  bg-[#ec644b] p-1 text-white'
                                    onClick={()=> navigate(`/meal/${review.mealId}`)}>
                                        View Meal
                                    </button>
                                    <button
                                    className='btn btn-xs md:btn-sm text-white bg-[#0c6c7c]'
                                    onClick={()=> handleDelete(review._id)}>
                                        Delete
                                    </button>


                                </td>

                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan='6' className='text-center py-4 text-gray-500'>No reviews Found</td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
            
        </div>
    );
};

export default AllReviews;