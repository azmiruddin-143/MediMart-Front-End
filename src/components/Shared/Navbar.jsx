// import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import sitelogo from '../../assets/foods-logo.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
// import { AuthContext } from '../Auth Provider/AuthProvider';


const Navbar = () => {
    // old header//
    const { user, userLogout } = useContext(AuthContext);
    const [isBlurred, setIsBlurred] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const navigate = useNavigate();

    // Logout Handler
    // const userLogoutHandler = () => {
    //     userLogout()
    //         .then(() => {
    //             toast.success("Logout successful!", { autoClose: 3000 });
    //             navigate("/");
    //         })
    //         .catch((error) => {
    //             toast.error(`Logout failed: ${error.message}`, {
    //                 autoClose: 3000,
    //             });

    //         });

    // };

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

    return (
        <div
            className={`sticky top-0 w-full z-40 transition-all duration-300 ${isBlurred ? "bg-[#07060995] backdrop-blur-md " : "bg-[#194b76]"
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
                                    className={`${isBlurred && "text-white"} text-white sm:h-8 sm:w-8 h-6 w-6`}
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
                                    className="menu menu-sm dropdown-content gap-4 text-neutral bg-primary rounded-box z-[1] mt-3 w-44 sm:w-52 py-6 px-2 shadow"
                                >
                                    <button onClick={() => setIsDropdownOpen(false)}>
                                        <IoIosCloseCircle className="absolute text-secondary right-0 top-0" size={30} />
                                    </button>

                                    <NavLink
                                        to="/"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                                : ""
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/allfoods"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                                : ""
                                        }
                                    >
                                        Shop
                                    </NavLink>
                                    <NavLink
                                        to="/gallery"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                                : ""
                                        }
                                    >
                                        Gallery
                                    </NavLink>
                                    <NavLink
                                        to="/aboutus"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                                : ""
                                        }
                                    >
                                        About Us
                                    </NavLink>
                                    <NavLink
                                        to="/contactus"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                                : ""
                                        }
                                    >
                                        Contact US
                                    </NavLink>




                                </ul>
                            )}
                        </div>
                        <Link to={'/'} >
                            <div className='flex items-center gap-0 sm:gap-3'>
                                <img className={`${isBlurred ? 'sm:w-[60px] w-[40px] rounded-full' : "sm:w-[60px] w-[40px] rounded-full"}`} src={sitelogo} alt="" />
                                <h1 className={`${isBlurred && "text-secondary font-bold"} sm:text-3xl text-[12px] pl-2 lg:pl-0 lg:text-xl xl:text-3xl text-secondary font-bold`}> FoodFusion
                                </h1>
                            </div>
                        </Link>
                    </div>

                    <div className="navbar-center  xl:ml-10 2xl:ml-0 hidden lg:flex">
                        <ul className={`${isBlurred ? "xl:text-lg text-md text-white flex gap-3 sm:gap-6 xl:gap-8" : "xl:text-lg text-md text-white  flex gap-3 sm:gap-6 xl:gap-8"}`}>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                        : ""
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/allfoods"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                        : ""
                                }
                            >
                                Shop
                            </NavLink>

                            <NavLink
                                to="/aboutus"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                        : ""
                                }
                            >
                                About Us
                            </NavLink>
                            <NavLink
                                to="/contactus"
                                className={({ isActive }) =>
                                    isActive
                                        ? `${isBlurred ? "text-secondary font-bold border-b border-secondary" : "text-secondary border-b border-secondary"}`
                                        : ""
                                }
                            >
                                Contact Us
                            </NavLink>
                        
                           

                            <details className="dropdown">
                                    <summary className="">Languse Change</summary>
                                    <ul className="menu dropdown-content bg-base-10 text-black rounded-box z-[1] w-52 p-5 shadow">
                                        <li><a>English</a></li>
                                        <li><a>Bangla</a></li>
                                    </ul>
                                </details>


                        </ul>
                    </div>
                    <div className="navbar-end">

                        <div className="flex gap-0 sm:gap-4 items-center">
                            {/* <ToggleTeme></ToggleTeme> */}
                            {/* <input type="checkbox" value="synthwave" className="toggle theme-controller" /> */}

                            <label className="swap swap-rotate">

                                <input type="checkbox" className="theme-controller" value="dark" />


                                <svg
                                    className="swap-off text-secondary h-10 sm:w-10 w-8 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                                    />
                                </svg>


                                <svg
                                    className="swap-on text-secondary h-10 sm:w-10 w-8 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                                    />
                                </svg>
                            </label>

                            {user ? (
                                <button
                                    onClick={userLogoutHandler}
                                    className={`${isBlurred && 'bg-[white] text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg'

                                        } bg-secondary text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg`}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login">
                                    <button className={`${isBlurred && 'bg-[white] text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg'

                                        } bg-secondary text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg`}>
                                        Login
                                    </button>
                                </Link>
                            )}

                            {
                                user &&
                                <div className="relative flex justify-center items-center group w-[50px] sm:w-[70px] h-[70px]">

                                    {
                                        user &&
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-96 rounded-full">
                                                    <img
                                                        referrerPolicy='no-referrer'
                                                        // alt="Tailwind CSS Navbar component"
                                                        src={user?.photoURL}
                                                        data-tooltip-id="image-tooltip"
                                                        data-tooltip-content="azmirkhan"
                                                        style={{ cursor: "pointer" }}

                                                    />

                                                    <Tooltip id="image-tooltip" place="top" style={{ backgroundColor: "#333" }} />
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content text-neutral bg-primary space-y-3 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                                                <NavLink
                                                    to="/myfoods"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${isBlurred ? "text-secondary font-bold border-b" : "text-secondary"}`
                                                            : ""
                                                    }
                                                >
                                                    My Foods
                                                </NavLink>
                                                <NavLink
                                                    to="/addfood"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${isBlurred ? "text-secondary font-bold " : "text-secondary font-bold "}`
                                                            : ""
                                                    }
                                                >
                                                    Add food
                                                </NavLink>
                                                <NavLink
                                                    to="/myorders"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${isBlurred ? "text-secondary font-bold" : "text-secondary"}`
                                                            : ""
                                                    }
                                                >
                                                    My Orders
                                                </NavLink>

                                            </ul>
                                        </div>
                                    }
                                </div>
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
