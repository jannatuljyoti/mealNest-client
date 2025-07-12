import React from 'react';
import Banner from '../Banner/Banner';
import MealsByCategory from '../MealsByCategory/MealsByCategory';
import FaqNutrition from '../FAQ/FaqNutrition';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <FaqNutrition></FaqNutrition>
        </div>
    );
};

export default Home;