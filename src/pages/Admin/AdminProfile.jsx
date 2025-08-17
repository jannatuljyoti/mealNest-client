import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: adminMeals = [] } = useQuery({
    queryKey: ['adminMeals', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/meals/by-distributor?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-3 sm:p-5 rounded-lg shadow-md bg-base-100 min-h-screen">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
        <img
          src={user?.photoURL || 'https://i.ibb.co/2kRZVzM/avatar.png'}
          alt="Admin"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-orange-500 object-cover"
        />

        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">{user?.displayName || 'Admin'}</h2>
          <p className="text-sm sm:text-base ">{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-base sm:text-lg">
        <p>
          <span className="font-semibold">Total Meals Added:</span> {adminMeals.length}
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
