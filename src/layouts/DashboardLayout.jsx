import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
  return (

    <div className='md:flex'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {/* Left Side: Sidebar Component */}
      <Sidebar></Sidebar>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  '>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
      <ScrollRestoration/>
    </div>
  );
};

export default DashboardLayout;