import React from 'react';

const Banner = () => {
    return (
        <div
  className="hero min-h-screen rounded-2xl"
  style={{
    backgroundImage:
      "url(https://i.ibb.co/v4fDGm8n/istockphoto-1361544089-612x612.jpg)",
      backgroundSize:'cover',
      backgroundPosition:'center'
  }}
>
  <div className="hero-overlay rounded-2xl "></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 md:text-5xl font-bold "> Explore Hostel Meals & Reviews</h1>
      <p className="mb-5 text-gray-200">
        Find your favorite hostel meals, check what’s for today, and share your feedback.
      </p>
     
     <div className='flex justify-center items-center flex-col sm:flex-row'>
        <input type="text" 
        placeholder='Search meals' 
        className='input  input-bordered bg-black w-full p-4 max-w-xs'/>

         <button className="btn bg-[#ec644b] text-white p-4">Search</button>
     </div>
    </div>
  </div>
</div>
    );
};

export default Banner;