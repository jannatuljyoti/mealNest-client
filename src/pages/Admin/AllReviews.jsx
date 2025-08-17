import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data = {}, refetch, isLoading } = useQuery({
    queryKey: ['adminAllReviews', currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/admin/all-reviews?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const reviews = data.reviews || [];
  const totalPages = data.totalPages || 1;

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/reviews/${id}`);
        Swal.fire('Deleted!', 'Review has been deleted.', 'success');
        refetch();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to delete review', 'error');
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 bg-base-100">
      <h2 className="text-xl md:text-2xl text-center font-bold mb-4">All Reviews</h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Meal Title</th>
              <th className="px-4 py-2 text-left">Likes</th>
              <th className="px-4 py-2 text-left">Reviews Count</th>
              <th className="px-4 py-2 text-left">Review</th>
              <th className="px-4 py-2 text-left">User Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{review.mealTitle}</td>
                <td className="px-4 py-2">{review.likes}</td>
                <td className="px-4 py-2">{review.reviews_count}</td>
                <td className="px-4 py-2 max-w-[200px] truncate md:max-w-none">
                  {review.review}
                </td>
                <td className="px-4 py-2">{review.userEmail}</td>
                <td className="px-4 py-2 space-y-1 md:space-x-2 md:space-y-0 flex flex-col md:flex-row">
                  <button
                    className="btn btn-xs md:btn-sm bg-[#ec644b] text-white"
                    onClick={() => navigate(`/meal/${review.mealId}`)}
                  >
                    View Meal
                  </button>
                  <button
                    className="btn btn-xs md:btn-sm bg-[#0c6c7c] text-white"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No reviews Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-3 py-1 rounded border transition ${
              currentPage === page + 1
                ? 'bg-cyan-950 text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
