import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminProfile = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: adminMeals = [] } = useQuery({
        queryKey:['adminMeals', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/api/meals/by-distributor?email=${user?.email}`);
            return res.data;
        },
        enabled: !! user?.email,
    });
    
    
    return (
        <div className='p-5 rounded-lg shadow-md bg-white dark:bg-gray-200 min-h-screen'>
            <div className='flex items-center gap-3 mb-5'>
                <img src={user?.photoURL || 'https://i.ibb.co/2kRZVzM/avatar.png'} alt="Admin"
                className='w-20 h-20 rounded-full border-2 border-orange-500' />

                <div>
                    <h2 className='text-2xl text-gray-700 font-bold'>{user?.displayName || 'Admin'}</h2>
                    <p className='text-gray-600'>{user?.email}</p>
                </div>

            </div>

            <div className='text-lg'>
                <p><span className='font-semibold text-gray-700 '>Total Meals Added:</span> {adminMeals.length}</p>

            </div>
            
        </div>
    );
};

export default AdminProfile;