import React from 'react';
import { FaLeaf, FaQuestionCircle, FaUtensils } from 'react-icons/fa';

const FaqNutrition = () => {
    return (
       <section className='bg-base-100 py-10 px-4'>
        <div className=' mx-auto'>
            <h2 className='text-3xl text-gray-600 font-bold text-center mb-7 pb-5'>FAQs & Nutrition Tips</h2>

            {/* Grid */}
            <div className='grid md:grid-cols-2 gap-9 px-10'>

                {/* FAQ Section */}
                <div>
                    <h3 className='text-2xl font-semibold mb-4 flex items-center gap-2 text-[#ec644b]'><FaQuestionCircle></FaQuestionCircle> Frequently Asked Questions</h3>

                    <div className='space-y-4'>

                        <div>
                            <h4 className='font-bold text-lg'>Q: Can I skip meals on weekends?</h4>
                            <p className='text-gray-700'>Upgrade from your dashboard or contact an admin for assistance.</p>
                        </div>

                        <div>
                            <h4 className='font-bold text-lg'>Q: How can I become a premium user?</h4>
                            <p className='text-gray-700'>Upgrade from your dashboard or contact an admin for assistance.</p>
                        </div>

                        <div>
                            <h4 className='font-bold text-lg'>Q: How are meals planned?</h4>
                            <p className='text-gray-700'>Meals are planned weekly with a balance of carbs, proteins, and veggies.</p>
                        </div>

                    </div>
                </div>

                {/* Nutrition Tips */}
                <div>
                    <h3 className='text-2xl font-semibold mb-4 flex items-center gap-2 text-[#0c6c7c]'>
                        <FaLeaf></FaLeaf>Nutrition Tips for Hostel Students
                    </h3>

                    <ul className='list-disc list-inside text-gray-700 space-y-2'>

                        <li className='text-lg'><FaUtensils className='inline mr-2 text-green-600'></FaUtensils>Drink at least 2 liters of water daily</li>

                        <li className='text-lg'><FaUtensils className='inline mr-2 text-green-600'></FaUtensils>Never skip breakfast—it powers your brain</li>

                        <li className='text-lg'><FaUtensils className='inline mr-2 text-green-600'></FaUtensils>Add fruits to your daily intake</li>

                        <li className='text-lg'><FaUtensils className='inline mr-2 text-green-600'></FaUtensils>Avoid too much sugar and fast food</li>

                        <li className='text-lg'><FaUtensils className='inline mr-2 text-green-600'></FaUtensils>Try to eat greens and proteins in every meal</li>

                    </ul>
                </div>

            </div>

        </div>

       </section>
    );
};

export default FaqNutrition;