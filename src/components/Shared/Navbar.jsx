// import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import sitelogo from '../../assets/medicine-logo.png'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaCartShopping } from "react-icons/fa6";
import useCart from '../../hooks/useCart';
import LoadingSpinner from './LoadingSpinner';
import toast from 'react-hot-toast';

const Navbar = () => {
    // old header//
    const { user, userLogout } = useContext(AuthContext);
    const [isBlurred, setIsBlurred] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [cart, isLoading] = useCart()
    

    // Logout Handler
    const userLogoutHandler = () => {
        userLogout()
            .then(() => {
                toast.success('Logout successful!!', {
                    duration: 3000,
                });
                navigate("/signin");
            })
            .catch((error) => {

                toast.error("Logout failed", (error.message), {
                    duration: 3000,
                })

            });

    };

    // Scroll Listener for Blur Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsBlurred(true);
            } else {
                setIsBlurred(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    if (isLoading) return <LoadingSpinner />;

    const handleClose = (event) => {
        const detailsElement = event.target.closest("details");
        if (detailsElement) {
            detailsElement.removeAttribute("open");
        }
    };

    return (
        <div
            className={`sticky top-0 w-full z-40 transition-all duration-300 ${isBlurred ? "bg-[#070609c3] backdrop-blur-md " : "bg-[#ad7925]"
                }`}
        >
            <div className="2xl:mx-32 xl:mx-24 sm:mx-4 ">
                <div className="navbar p-1">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn p-0 btn-ghost lg:hidden"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${isBlurred && "text-primary"}  text-white sm:h-8 sm:w-8 h-6 w-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </div>
                            {isDropdownOpen && (
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content gap-4 text-primary bg-black rounded-box z-[1] mt-3 w-44 sm:w-52 py-6 px-2 shadow"
                                >
                                    <button onClick={() => setIsDropdownOpen(false)}>
                                        <IoIosCloseCircle className="absolute text-primary right-0 top-0" size={30} />
                                    </button>

                                    <NavLink
                                        to="/"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-primary font-bold border-b border-primary" : "text-white border-b border-white"}`
                                                : ""
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/shop"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-primary font-bold border-b border-primary" : "text-white border-b border-white"}`
                                                : ""
                                        }
                                    >
                                        Shop
                                    </NavLink>

                                    <NavLink
                                        onClick={() => setIsDropdownOpen(false)}
                                        to="/contactus"
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-primary font-bold border-b border-primary" : "text-white border-b border-white"}`
                                                : ""
                                        }
                                    >
                                        Contact Us
                                    </NavLink>



                                    <details className="dropdown">

                                        <summary className="">Languse Change</summary>
                                        <ul className="menu dropdown-content bg-base-10 text-white bg-black rounded-box z-[1] w-52 p-5 shadow">
                                            <button onClick={handleClose}>
                                                <IoIosCloseCircle className=" absolute text-primary right-0 top-0" size={30} />
                                            </button>
                                            <li onClick={handleClose}><a>English</a></li>
                                            <li onClick={handleClose}> <a>Bangla</a></li>
                                        </ul>
                                    </details>

                                </ul>
                            )}
                        </div>
                        <Link to={'/'} >
                            <div className='flex items-center gap-0 sm:gap-3'>
                                <img className={`${isBlurred ? 'sm:w-[60px] w-[40px] rounded-full' : "sm:w-[60px] w-[40px] rounded-full"}`} src={sitelogo} alt="" />
                                <h1 className={`${isBlurred && "text-white font-bold"} sm:text-3xl text-[16px] pl-2 lg:pl-0 lg:text-2xl xl:text-3xl text-white font-bold`}> Medi
                                    <span className={`${isBlurred && "text-primary"} text-[black] relative sm:right-2 lg:right-1 xl:right-2 right-1 font-bold`}> Mart</span>
                                </h1>
                            </div>
                        </Link>
                    </div>

                    <div className="navbar-center  xl:ml-10 2xl:ml-0 hidden lg:flex">

                        <ul className={`${isBlurred ? "xl:text-lg text-md font-semibold text-white flex gap-3 sm:gap-6 xl:gap-8" : "xl:text-lg text-md font-semibold text-black  flex gap-3 sm:gap-6 xl:gap-8"}`}>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-primary font-bold border-b border-primary" : "text-white border-b border-white"}`
                                        : ""
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/shop"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-primary font-bold border-b border-primary" : "text-white border-b border-white"}`
                                        : ""
                                }
                            >
                                Shop
                            </NavLink>


                            <NavLink
                                to="/contactus"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-primary font-bold border-b border-primary" : "text-white border-b border-white"}`
                                        : ""
                                }
                            >
                                Contact Us
                            </NavLink>



                            <details className="dropdown">

                                <summary className="">Languse Change</summary>
                                <ul className="menu dropdown-content bg-base-10 text-white bg-black rounded-box z-[1] w-52 p-5 shadow">
                                    <button onClick={handleClose}>
                                        <IoIosCloseCircle className=" absolute text-primary right-0 top-0" size={30} />
                                    </button>
                                    <li onClick={handleClose}><a>English</a></li>
                                    <li onClick={handleClose}> <a>Bangla</a></li>
                                </ul>
                            </details>


                        </ul>
                    </div>
                    <div className="navbar-end">

                        <div className="flex gap-6 sm:gap-8 items-center">
                            {/* <ToggleTeme></ToggleTeme> */}
                            {/* <input type="checkbox" value="synthwave" className="toggle theme-controller" /> */}

                            {/*  */}

                            {/* {user ? (
                                <button
                                    onClick={userLogoutHandler}
                                    className={`${isBlurred && 'bg-[white] text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg'

                                        } bg-secondary text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg`}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/signin">
                                    <button className={`${isBlurred && 'bg-[white] text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg'

                                        } bg-secondary text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg`}>
                                        Login
                                    </button>
                                </Link>
                            )} */}

                            <Link to={'/cart'} >
                                <div className='relative'>
                                    <FaCartShopping className={`${isBlurred ? "text-white text-2xl sm:text-3xl" : "text-black text-2xl sm:text-3xl"}`} />
                                    <h1 className=' font-bold bg-white text-primary text-sm px-1 sm:text-xl sm:px-2 rounded-full absolute -top-3 left-4 sm:left-6'>{cart.length}</h1>
                                </div>
                            </Link>

                            {
                                user ?
                                    <div className="relative flex justify-center items-center group w-[50px] sm:w-[70px] h-[70px]">

                                        {
                                            user &&
                                            <details className="dropdown dropdown-end">
                                                {/* Dropdown Toggle */}
                                                <summary tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-96 rounded-full">
                                                        <img
                                                            referrerPolicy="no-referrer"
                                                            src={`${user?.photoURL}`}
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                </summary>

                                                {/* Dropdown Content */}
                                                <ul
                                                    className="menu menu-sm py-8 dropdown-content text-primary bg-black space-y-3 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                                >
                                                    {/* Close Button */}
                                                    <button
                                                        onClick={handleClose}
                                                        className="absolute text-primary right-0 top-0 p-2"
                                                    >
                                                        <IoIosCloseCircle size={30} />
                                                    </button>

                                                    {/* Dropdown Links */}

                                                    <Link onClick={handleClose} to="/updateprofile" className="text-primary font-semibold px-3 rounded-md hover:bg-white">
                                                        Update Profile
                                                    </Link>

                                                    <Link onClick={handleClose} to="/dashboard" className="text-primary font-semibold px-3 rounded-md hover:bg-white">
                                                        Dashboard
                                                    </Link>
                                                    <Link onClick={handleClose} to="/cart" className="text-primary font-semibold px-3 rounded-md hover:bg-white">
                                                        WishList
                                                    </Link>


                                                    <button
                                                        onClick={userLogoutHandler}
                                                        className="text-primary font-semibold flex justify-start px-3 rounded-md hover:bg-white"
                                                    >
                                                        Logout
                                                    </button>

                                                </ul>
                                            </details>
                                        }
                                    </div>

                                    :

                                    <Link to="/signin">
                                        <button className={`${isBlurred && 'bg-[white] text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg'

                                            } bg-black text-white  text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg`}>
                                            Join Us
                                        </button>
                                    </Link>

                            }

                            {/* ....... */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
