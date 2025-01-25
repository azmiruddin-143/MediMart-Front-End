import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../components/Shared/Footer';
import { Toaster } from 'react-hot-toast';
const MainLayout = () => {
    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollRestoration />
        </div>
    );
};

export default MainLayout;