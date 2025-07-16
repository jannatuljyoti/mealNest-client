import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userData = {}} = useQuery({
        queryKey: ['user-profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/api/users?search=${user.email}`);
              return res.data.users?.[0]
        },
    });


    return (
        <div className='p-7 max-w-xl mx-auto bg-white shadow rounded'>
            <div className='flex flex-col items-center gap-5'>
                <img src={user?.photoURL || 'https://i.ibb.co/tM7whPN/default-avatar.png'} alt="User" 
                className='w-24 h-24 rounded-full shadow'/>

                <h2 className='text-xl font-bold'>{user?.displayName || userData?.name}</h2>
                <p className='text-gray-600'>{user?.email}</p>
                <span className={`px-4 py-2 rounded-full text-white font-semibold
                    ${userData?.badge == 'gold' ? 'bg-yellow-500' :
                    userData?.badge == 'silver' ? 'bg-gray-400' :
                    userData?.badge == 'platinum' ? 'bg-blue-500' : 'bg-orange-600'}`}>
                    {userData?.badge?.toUpperCase() || "BRONZE"}
                </span>

            </div>
            
        </div>
    );
};

export default MyProfile;