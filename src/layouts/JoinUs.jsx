import React, { useState } from 'react';

import MealNestLogo from '../pages/shared/mealnest/MealNestLogo';
import lottieFlies from '../assets/Login and Sign up.json'
import Lottie from 'lottie-react';
import Login from '../pages/JoinUs/Login';
import Register from '../pages/JoinUs/Register';

const JoinUs = () => {
  const [isLogin, setIsLogin]=useState(true);

    return (
        
        <div className="p-9  min-h-screen flex flex-col">
            <div className='mb-7 '>
              <MealNestLogo></MealNestLogo>
            </div>

            <div className="flex flex-1 items-center justify-center ">
             <div className='flex flex-col lg:flex-row-reverse items-center justify-center gap-10  w-full'>
               
               <div className='flex-1 max-w-xl'>
                  <Lottie animationData={lottieFlies} loop={true}/>
               </div>

                {/* form section */}
               <div className='flex-1 max-w-xl w-full'>
                 {/* tabs */}
                 <div className='tabs tabs-boxed mb-5 flex justify-center'>
                  <button className={`tab ${isLogin ? 'tab-active' : ''}`}
                  onClick={()=>setIsLogin(true)}>
                    Login
                  </button>

                  <button className={`tab ${isLogin ? 'tab-active' : ''}`}
                  onClick={()=>setIsLogin(false)}>
                    Register
                  </button>
                 </div>

                 {/* conditional rendering */}
                 {isLogin ? <Login/> : <Register/>}
                </div>

             </div>
  </div>
</div>
    );
};

export default JoinUs;