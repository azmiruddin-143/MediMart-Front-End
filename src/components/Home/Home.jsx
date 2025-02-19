import React from 'react';
import Banner from './Banner';
import TextSlider from './TextSlider';
import CategoryCard from './CategoryCard';
import DiscountProducts from './DiscountProducts';
import LatestProduct from './LatestProduct';
import HealthcarePartner from './HealthcarePartner';
import FeaturesSection from './FeaturesSection';
import Faq from './Faq';
import { Helmet } from 'react-helmet-async';
import Articles from './Articles';
import Sliders from './Sliders';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>MediMart | Home </title>
            </Helmet>
            {/* <Banner></Banner> */}
            <Sliders></Sliders>
            <TextSlider></TextSlider>
            <CategoryCard></CategoryCard>
            <DiscountProducts></DiscountProducts>
            <LatestProduct></LatestProduct>
            <Articles></Articles>
            <HealthcarePartner></HealthcarePartner>
            <FeaturesSection></FeaturesSection>
            <Faq></Faq>
        </div>
    );
};

export default Home;