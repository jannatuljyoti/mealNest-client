import React from 'react';
import { Outlet } from 'react-router';
import MealNestLogo from '../pages/shared/mealnest/MealNestLogo';

const JoinUs = () => {
    return (
        <div className='p-16 bg-[#f4f8ff] min-h-screen'>
            <div className='mb-'>
                <MealNestLogo></MealNestLogo>
                </div>
            <Outlet></Outlet>
        </div>
    );
};

export default JoinUs;