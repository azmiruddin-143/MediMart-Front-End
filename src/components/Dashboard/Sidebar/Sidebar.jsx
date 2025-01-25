import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import sitelogo from '../../../assets/foods-logo.png';
import { IoHomeOutline, IoSettingsSharp, IoMenu, IoClose } from "react-icons/io5";
import { FaUsers } from 'react-icons/fa';
import { TbCategory, TbFileReport } from "react-icons/tb";
import { MdLogout, MdPayment } from "react-icons/md";
import { PiFlagBanner } from "react-icons/pi";
import { BsEnvelopeOpenHeart } from 'react-icons/bs';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole';
import { AuthContext } from '../../../providers/AuthProvider';

const Sidebar = () => {
    const { role, isLoading } = useRole()
    const { user, userLogout } = useContext(AuthContext);

    console.log(role);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/dashboard')) {
            setIsDrawerOpen(true);
        }
    }, [location]);

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    const userLogoutHandler = () => {
        userLogout()
            .then(() => {
                toast.success("Logout successful!", { autoClose: 3000 });
                navigate("/");
            })
            .catch((error) => {
                toast.error(`Logout failed: ${error.message}`, {
                    autoClose: 3000,
                });

            });

    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                className="text-2xl p-2 fixed top-0 left-2 z-50 lg:hidden"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                {isDrawerOpen ? <IoClose className='text-white border border-primary text-3xl rounded-full' /> : <IoMenu className='text-black border  border-primary text-3xl rounded-full' />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen z-20 bg-gray-100 w-74 transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static`}
            >
                {/* Logo Section */}
                <Link to={'/'}>
                    <div className="flex bg-slate-700 mx-auto py-2 justify-center items-center mb-8 gap-1">
                        <img className="sm:w-[60px] w-[40px] rounded-full" src={sitelogo} alt="Logo" />
                        <h1 className="text-white">MediMart</h1>
                    </div>
                </Link>


                <div className='mb-10'>

                    <div className="avatar px-8 pb-5 flex justify-center sm:block">
                        <div className="ring-[#e09d15] ring-offset-base-100 w-16 sm:w-24 lg:w-24 rounded-full ring ring-offset-2">
                            <img src={user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                    <div className='px-6'>
                        <h1>Name: {user?.displayName}</h1>
                        <h1>Email: {user?.email}</h1>
                        <h1>Role: {role}</h1>
                    </div>
                </div>

                {/* Navigation Links */}



                <div>
                    {
                        role === "Admin" &&
                        <div>

                            <NavLink
                                to="/dashboard/adminhomepage"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                        : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                                }
                            >
                                <IoHomeOutline className="text-xl" />
                                Admin Homepage
                            </NavLink>
                            <NavLink
                                to="/dashboard/manageusers"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                        : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                                }
                            >
                                <FaUsers className="text-xl" />
                                Manage Users
                            </NavLink>
                            <NavLink
                                to="/dashboard/managecategory"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                        : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                                }
                            >
                                <TbCategory className="text-xl" />
                                Manage Category
                            </NavLink>
                            <NavLink
                                to="/dashboard/paymentmanagement"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                        : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                                }
                            >
                                <MdPayment className="text-xl" />
                                Payment management
                            </NavLink>
                            <NavLink
                                to="/dashboard/salesreport"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                        : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                                }
                            >
                                <TbFileReport className="text-xl" />
                                Sales Report
                            </NavLink>
                            <NavLink
                                to="/dashboard/managebanner"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                        : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
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
                                    ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <IoHomeOutline className="text-xl" />
                            Seller Homepage
                        </NavLink>


                        <NavLink
                            to="/dashboard/managemedicines"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <BsEnvelopeOpenHeart className="text-xl" />
                            Manage Medicines
                        </NavLink>

                        <NavLink
                            to="/dashboard/paymenthistory"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <MdPayment className="text-xl" />
                            Payment History
                        </NavLink>
                        <NavLink
                            to="/dashboard/askforadvertisement"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
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
                                ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                                : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                        }
                    >
                        <MdPayment className="text-xl" />
                        Payment history
                    </NavLink>
                }


                {/* Divider */}
                <div className="divider mb-14"></div>

                {/* Profile and Logout */}
                <NavLink
                    to="/updateprofile"
                    className={({ isActive }) =>
                        isActive
                            ? "text-black  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-primary border-secondary"
                            : "flex items-center justify-start py-2 hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                    }
                >
                    <IoSettingsSharp className="text-xl" />
                    Profile
                </NavLink>
                <button
                    onClick={userLogoutHandler}
                    className={"flex items-center w-[87%]  justify-start hover:bg-primary hover:font-bold duration-300 rounded-md mx-5 border border-gray-300 pl-3 py-2 gap-3 mb-5"}
                >
                    <MdLogout className="text-xl" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
