import React from 'react';
import Banner from './Banner';
import TextSlider from './TextSlider';
import CategoryCard from './CategoryCard';
import DiscountProducts from './DiscountProducts';
import LatestProduct from './LatestProduct';
import HealthcarePartner from './HealthcarePartner';
import FeaturesSection from './FeaturesSection';
import Faq from './Faq';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TextSlider></TextSlider>
            <CategoryCard></CategoryCard>
            <DiscountProducts></DiscountProducts>
            <LatestProduct></LatestProduct>
            <HealthcarePartner></HealthcarePartner>
            <FeaturesSection></FeaturesSection>
            <Faq></Faq>
         
        </div>
    );
};

export default Home;