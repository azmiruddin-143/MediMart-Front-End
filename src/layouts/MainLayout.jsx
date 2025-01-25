import React from 'react';
import Navbar from '../components/Shared/Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../components/Shared/Footer';
import { ToastContainer } from 'react-toastify';
const MainLayout = () => {
    return (
        <div>
            <ToastContainer></ToastContainer>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollRestoration/>
        </div>
    );
};

export default MainLayout;