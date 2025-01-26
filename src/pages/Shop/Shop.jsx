import React from 'react';
import AllMedicine from './AllMedicine';
import { Helmet } from 'react-helmet-async';

const Shop = () => {
    return (
        <div>
            <Helmet>
                <title>MediMart | Shop </title>
            </Helmet>
            <AllMedicine></AllMedicine>
        </div>
    );
};

export default Shop;