import React from 'react';
import logo from '../../../assets/images (1).png'
import { Link } from 'react-router';

const MealNestLogo = () => {
    return (
        <div className='flex items-center gap-2'>
           
             <Link to="/">
        <img src={logo} className='rounded-full w-12 h-12 cursor-pointer' alt="MealNest Logo" />
      </Link>
            
            <p className='text-2xl font-bold'>Meal<span className='text-[#ec644b] '>Nest</span></p>
        </div>
    );
};

export default MealNestLogo;