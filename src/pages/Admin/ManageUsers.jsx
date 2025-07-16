
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;


  // debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const { data = {}, refetch, isLoading } = useQuery({
    queryKey: ['all-users', debouncedTerm,currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/users?search=${debouncedTerm}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data.users || [];
  const totalPages = data.totalPages || 1;

  const handleMakeAdmin = async (user) => {
    try {
      const res = await axiosSecure.patch(`/api/users/admin/${user._id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: `${user.name || 'User'} is now an admin!`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to make admin',
        text: error.message,
      });
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 bg-amber-500 max-h-screen">
      <h2 className="text-2xl  font-bold mb-4">Manage Users</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered w-full max-w-xs mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
    <table className="table bg-gray-50 text-gray-800 w-full">



          <thead className="">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.badge || 'bronze'}</td>
                <td>{user.role || 'user'}</td>
                <td>
                  {user.role === 'admin' ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-[#0c6c7c] hover:bg-blue-600 text-white"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    {/* Pagination Footer */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === page + 1
                ? 'bg-amber-950 text-white'
                : 'bg-white text-black'
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
