import React from 'react';
import Banner from '../Banner/Banner';
import MealsByCategory from '../MealsByCategory/MealsByCategory';
import FaqNutrition from '../FAQ/FaqNutrition';
import MemberShip from '../MemberShip/MemberShip';
import AboutUs from '../AboutUs/AboutUs';
import TopRated from '../TopRated/TopRated';
import Achievements from '../Achievements/Achievements';
import WeeklyMeal from '../WeeklyMeal/WeeklyMeal';

const Home = () => {
    return (
        <div className=' mx-auto'>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <FaqNutrition></FaqNutrition>
            <MemberShip></MemberShip>
            <AboutUs></AboutUs>
            <TopRated></TopRated>
            <Achievements></Achievements>
            <WeeklyMeal></WeeklyMeal>
        </div>
    );
};

export default Home;