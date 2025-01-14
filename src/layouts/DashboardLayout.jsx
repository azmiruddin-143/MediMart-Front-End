import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='md:flex'>
        {/* Left Side: Sidebar Component */}
        <Sidebar></Sidebar>
        {/* Right Side: Dashboard Dynamic Content */}
        <div className='flex-1  lg:ml-64 ml-14'>
          <div className='p-5'>
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashboardLayout;