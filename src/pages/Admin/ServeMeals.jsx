import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, refetch } = useQuery({
    queryKey: ['serveMeals', search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/admin/meal-requests?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const { requests = [], totalPages = 1 } = data;

  const handleServe = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Mark this meal as delivered?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, serve it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/api/admin/meal-requests/${id}`);
        Swal.fire('Success', 'Meal marked as delivered.', 'success');
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to serve meal', 'error');
      }
    }
  };

  return (
    <div className="p-4 bg-base-100 text-base-content min-h-screen">
      <h2 className="text-xl md:text-2xl text-center font-bold mb-4">Serve Meal</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user name or email..."
          className="input input-bordered w-full max-w-md text-sm md:text-base"
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Meal Title</th>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">User Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{request.mealTitle}</td>
                <td className="px-4 py-2">{request.userName || 'N/A'}</td>
                <td className="px-4 py-2 break-words max-w-[150px] md:max-w-none">
                  {request.userEmail}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`badge text-xs sm:text-sm ${
                      request.status === 'delivered'
                        ? 'badge-success bg-green-700 text-white'
                        : 'bg-[#ec644b] text-white badge-warning'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {request.status !== 'delivered' && (
                    <button
                      className="btn btn-xs sm:btn-sm md:btn-md bg-[#0c6c7c] text-white w-full sm:w-auto"
                      onClick={() => handleServe(request._id)}
                    >
                      Serve
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No meal requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-3 py-1 rounded text-sm sm:text-base transition ${
              page === num + 1
                ? 'bg-[#0c6c7c] text-white'
                : 'bg-cyan-900 text-gray-200 hover:bg-cyan-800'
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
