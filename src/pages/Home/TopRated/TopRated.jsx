import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRated = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/all-meals?sortBy=likes&order=desc&limit=3`)
            .then(res => setMeals(res.data.meals))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className=" mx-auto px-4">
                <h2 className="text-3xl text-[#ec644b] font-bold mb-8 text-center">Top Rated Meals</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {meals.map(meal => (
                        <div key={meal._id} className="p-6 bg-white rounded-lg shadow-md text-center">
                            <h3 className="text-xl text-gray-600 font-semibold mb-2">{meal.title}</h3>
                            <p className="text-yellow-500 font-bold">{meal.likes} ★</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopRated;
