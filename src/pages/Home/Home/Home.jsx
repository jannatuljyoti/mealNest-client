import React from 'react';
import Banner from '../Banner/Banner';
import MealsByCategory from '../MealsByCategory/MealsByCategory';
import FaqNutrition from '../FAQ/FaqNutrition';
import MemberShip from '../MemberShip/MemberShip';

const Home = () => {
    return (
        <div className='md:container mx-auto'>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <FaqNutrition></FaqNutrition>
            <MemberShip></MemberShip>
        </div>
    );
};

export default Home;