// import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import sitelogo from '../../assets/foods-logo.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';


const Navbar = () => {
    // old header//
    const { user, userLogout } = useContext(AuthContext);
    const [isBlurred, setIsBlurred] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Logout Handler
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

                            {
                                user ?
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

                                                        />


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
                                                        Update Profile
                                                    </NavLink>
                                                    <NavLink
                                                        to="/addfood"
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? `${isBlurred ? "text-secondary font-bold " : "text-secondary font-bold "}`
                                                                : ""
                                                        }
                                                    >
                                                        Dashboard
                                                    </NavLink>

                                                    <button
                                                        onClick={userLogoutHandler}
                                                        className={`${isBlurred && 'bg-[white] text-black text-base text-start  sm:text-lg  rounded-lg'

                                                            }  text-black  font-semibold  sm:text-lg  rounded-lg`}
                                                    >
                                                        Logout
                                                    </button>


                                                </ul>
                                            </div>
                                        }
                                    </div>

                                    :

                                    <Link to="/signin">
                                        <button className={`${isBlurred && 'bg-[white] text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg'

                                            } bg-secondary text-black text-base font-semibold py-1 px-2 sm:text-lg sm:py-2 sm:px-6 rounded-lg`}>
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
