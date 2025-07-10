import React from 'react';
import { Outlet } from 'react-router';
import MealNestLogo from '../pages/shared/mealnest/MealNestLogo';
import lottieFlies from '../assets/Login and Sign up.json'
import Lottie from 'lottie-react';

const JoinUs = () => {
    return (
        // <div className='p-16 bg-[#f4f8ff] min-h-screen'>
        //     <div className='mb-'>
        //         <MealNestLogo></MealNestLogo>
        //         </div>
        //     <Outlet></Outlet>
        // </div>

        <div className="p-16 bg-[#f4f8ff] min-h-screen flex flex-col">
            <div className='mb-8 '>
              <MealNestLogo></MealNestLogo>
            </div>

            <div className="flex flex-1 items-center justify-center ">
             <div className='flex flex-col lg:flex-row-reverse items-center justify-center gap-10  w-full'>
               
               <div className='flex-1 max-w-xl'>
                  <Lottie animationData={lottieFlies} loop={true}/>
               </div>


               <div className='flex-1 max-w-xl w-full'>
                 <Outlet></Outlet>
                </div>

             </div>
  </div>
</div>
    );
};

export default JoinUs;