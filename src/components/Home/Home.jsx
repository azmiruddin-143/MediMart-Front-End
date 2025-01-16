import React from 'react';
import Banner from './Banner';
import TextSlider from './TextSlider';
import CategoryCard from './CategoryCard';
import DiscountProducts from './DiscountProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TextSlider></TextSlider>
            <CategoryCard></CategoryCard>
            <DiscountProducts></DiscountProducts>
         
        </div>
    );
};

export default Home;