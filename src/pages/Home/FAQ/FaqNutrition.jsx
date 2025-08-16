import React from 'react';
import { FaLeaf, FaUtensils } from 'react-icons/fa';

const FaqNutrition = () => {
    return (
        <section className="w-full md:w-4/5 lg:w-3/4 mx-auto bg-white   p-6 text-center">
            <h2 className='font-bold text-3xl text-[#ec644b] '>Nutrition Tips</h2>
            <div className="w-full md:w-4/5 lg:w-3/4 mx-auto  p-6 text-center">
    <h3 className='list-disc list-inside text-xl font-semibold mb-4 flex text-left gap-2 mx-auto max-w-xl text-[#0c6c7c]'>
        <FaLeaf className='text-green-600' /> Nutrition Tips for Hostel Students
    </h3>

    <ul className='list-disc list-inside text-gray-700 space-y-3 text-left mx-auto max-w-xl'>
        <li className='text-lg'>
            <FaUtensils className='inline mr-2 text-green-600' /> Drink at least 2 liters of water daily
        </li>
        <li className='text-lg'>
            <FaUtensils className='inline mr-2 text-green-600' /> Never skip breakfast—it powers your brain
        </li>
        <li className='text-lg'>
            <FaUtensils className='inline mr-2 text-green-600' /> Add fruits to your daily intake
        </li>
        <li className='text-lg'>
            <FaUtensils className='inline mr-2 text-green-600' /> Avoid too much sugar and fast food
        </li>
        <li className='text-lg'>
            <FaUtensils className='inline mr-2 text-green-600' /> Try to eat greens and proteins in every meal
        </li>
    </ul>
</div>

        </section>
    );
};

export default FaqNutrition;
