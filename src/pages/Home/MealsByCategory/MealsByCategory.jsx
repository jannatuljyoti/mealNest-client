import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import MealsCard from './MealsCard';

const MealsByCategory = () => {
    const [select, setSelect]=useState("All");

    const { data, isLoading } = useQuery({
  queryKey: ['meals', select],
  queryFn: async () => {
    const res = await axios.get(
      select === "All"
        ? `${import.meta.env.VITE_API_URL}/api/meals`
        : `${import.meta.env.VITE_API_URL}/api/meals?category=${select}`
    );
    return res.data;
  },
});

const meals =data?.meals || [];

    const categories = ["All", "Breakfast", "Lunch", "Dinner"];

    

    return (
        <div className='my-10 p-7 bg-emerald-50'>
            <h2 className='text-2xl font-bold text-[#ec644b] text-center mb-7'
            >Meals by Category</h2>

            {/* tabs */}
            <div className='tabs tabs-boxed justify-center mb-7'>
                {categories.map((cats)=>(
                    <button 
                    key={cats}
                    className={`tab ${select===cats ? "tab-active" : ""}`}
                    onClick={()=> setSelect(cats)}>{cats}</button>
                ))}

            </div>

            {/* Meals */}
            {isLoading ?(
                <div className='flex justify-center items-center min-h[200px]'>
                    <span className='loading loading-dots loading-lg'></span>
                    </div>
            ):(
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center'>
                    {
                        meals.slice(0, 3).map((meal)=>(
                            <MealsCard key={meal._id} meal={meal}/>
                        ))}
                </div>
            )}
            
        </div>
    );
};

export default MealsByCategory;