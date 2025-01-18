import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import sitelogo from '../../../assets/foods-logo.png';
import { IoHomeOutline, IoSettingsSharp, IoMenu, IoClose } from "react-icons/io5";
import { FaUsers } from 'react-icons/fa';
import { TbCategory, TbFileReport } from "react-icons/tb";
import { MdLogout, MdPayment } from "react-icons/md";
import { PiFlagBanner } from "react-icons/pi";
import { BsEnvelopeOpenHeart } from 'react-icons/bs';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole';

const Sidebar = () => {
    const { role, isLoading } = useRole()

    console.log(role);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/dashboard')) {
            setIsDrawerOpen(true);
        }
    }, [location]);

    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            {/* Toggle Button */}
            <button
                className="text-2xl p-2 fixed top-0 left-2 z-50 lg:hidden"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                {isDrawerOpen ? <IoClose /> : <IoMenu />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen z-20 bg-gray-100 w-60 transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static`}
            >
                {/* Logo Section */}
                <Link to={'/'}>
                    <div className="flex bg-slate-700 mx-auto justify-center items-center mb-16 gap-1">
                        <img className="sm:w-[60px] w-[40px] rounded-full" src={sitelogo} alt="Logo" />
                        <h1 className="text-white">MediMart</h1>
                    </div>
                </Link>

                {/* Navigation Links */}

                <div>
                    {
                        role === "Admin" &&
                        <div>

                            <NavLink
                                to="/dashboard/adminhomepage"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                        : "flex items-center justify-start py-2 bg-gray-200 pl-3 gap-3 mb-5"
                                }
                            >
                                <IoHomeOutline className="text-xl" />
                                Admin Homepage
                            </NavLink>
                            <NavLink
                                to="/dashboard/manageusers"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                        : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                                }
                            >
                                <FaUsers className="text-xl" />
                                Manage Users
                            </NavLink>
                            <NavLink
                                to="/dashboard/managecategory"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                        : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                                }
                            >
                                <TbCategory className="text-xl" />
                                Manage Category
                            </NavLink>
                            <NavLink
                                to="/dashboard/paymentmanagement"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                        : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                                }
                            >
                                <MdPayment className="text-xl" />
                                Payment management
                            </NavLink>
                            <NavLink
                                to="/dashboard/salesreport"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                        : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                                }
                            >
                                <TbFileReport className="text-xl" />
                                Sales Report
                            </NavLink>
                            <NavLink
                                to="/dashboard/managebanner"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                        : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                                }
                            >
                                <PiFlagBanner className="text-xl" />
                                Manage banner Advertise
                            </NavLink>
                        </div>
                    }
                </div>




                {/* seller */}


                {
                    role === "Seller" &&
                    <div>
                        <NavLink
                            to="/dashboard/sellerhomepage"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                    : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                            }
                        >
                            <PiFlagBanner className="text-xl" />
                            Seller Homepage
                        </NavLink>
                        

                        <NavLink
                            to="/dashboard/managemedicines"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                    : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                            }
                        >
                            <BsEnvelopeOpenHeart className="text-xl" />
                            Manage Medicines
                        </NavLink>

                        <NavLink
                            to="/dashboard/paymenthistory"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                    : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                            }
                        >
                            <PiFlagBanner className="text-xl" />
                            Payment History
                        </NavLink>
                        <NavLink
                            to="/dashboard/askforadvertisement"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                    : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                            }
                        >
                            <PiFlagBanner className="text-xl" />
                            Ask For Advertisement
                        </NavLink>
                    </div>
                }


                {
                    role === "User" &&
                    <NavLink
                            to="/dashboard/userpaymenthistory"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                                    : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                            }
                        >
                            <PiFlagBanner className="text-xl" />
                            Payment history
                        </NavLink>
                }


                {/* Divider */}
                <div className="divider"></div>

                {/* Profile and Logout */}
                <NavLink
                    to="/cxvb"
                    className={({ isActive }) =>
                        isActive
                            ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                            : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                    }
                >
                    <IoSettingsSharp className="text-xl" />
                    Profile
                </NavLink>
                <NavLink
                    to="/cxvb"
                    className={({ isActive }) =>
                        isActive
                            ? "text-red-600 border-b flex items-center pl-3 py-2 justify-start mb-5 gap-3 bg-black border-secondary"
                            : "flex items-center justify-start bg-gray-200 pl-3 py-2 gap-3 mb-5"
                    }
                >
                    <MdLogout className="text-xl" />
                    Logout
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
