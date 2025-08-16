import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/all-meals`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/admin/all-reviews`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
        ])
        .then(axios.spread((mealsRes, reviewsRes, usersRes) => {
            setAchievements([
                { id: 1, title: `${mealsRes.data.total}+ Meals Served`, description: 'All meals managed efficiently' },
                { id: 2, title: `${reviewsRes.data.total}+ Reviews`, description: 'Students actively share feedback' },
                { id: 3, title: `${usersRes.data.total}+ Students`, description: 'Registered hostel users' },
            ]);
        }))
        .catch(err => console.log(err));
    }, []);

    return (
        <section className="py-16 bg-gradient-to-r from-orange-50 to-green-50">
            <div className=" mx-auto px-4 text-center">
                <h2 className="text-3xl text-[#ec644b] font-bold mb-8">Our Achievements</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {achievements.map(item => (
                        <div key={item.id} className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl text-gray-600 font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
