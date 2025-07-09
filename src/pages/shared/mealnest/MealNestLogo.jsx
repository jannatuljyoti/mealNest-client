import React from 'react';
import logo from '../../../assets/images (1).png'

const MealNestLogo = () => {
    return (
        <div className='flex items-center gap-2'>
           
            <img src={logo} className='rounded-full w-14 h-14' alt="" />
            
            <p className='text-3xl font-bold'>Meal<span className='text-[#ec644b] '>Nest</span></p>
        </div>
    );
};

export default MealNestLogo;