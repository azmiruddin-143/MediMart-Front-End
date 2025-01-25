import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import sitelogo from '../../assets/medicine-logo.png'
const Footer = () => {
  return (
    <footer className="bg-[#000000e0]  text-gray-400">
      <div className="container mx-auto py-10 grid xl:grid-cols-5 lg:grid-cols-4 place-items-center lg:mx-8 xl:mx-auto gap-y-8  justify-center ">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <div className='flex items-center mb-5'>
            <img className={"sm:w-[60px] w-[40px] rounded-full"} src={sitelogo} alt="" />
            <h1 className={`sm:text-3xl text-[16px] pl-2 lg:pl-0 lg:text-2xl xl:text-3xl text-primary font-bold`}> Medi
              <span className={`text-[white] relative sm:right-2 lg:right-1 xl:right-2 right-1 font-bold`}> Mart</span>
            </h1>
          </div>
          <p className="text-md mb-4 text-gray-300 text-md ">
            We provide quality medicine products for your health and well-being
          </p>
          <ul className="text-md space-y-1 text-gray-300 text-md">
            <li>Bangladesh, Dhaka, Sonargaon</li>
            <li>+8801933946077</li>
            <li>azmiruddin05@gmail.com</li>
          </ul>
          <div className="flex text-xl space-x-4 mt-4 text-white">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-white text-2xl font-semibold mb-2">Company</h4>
          <ul className="text-md text-gray-300">
            <li className="mb-2"><Link to={'/shop'}>Shop</Link></li>
            <li className="mb-2"><Link to={'/about'}>About</Link></li>
            <li className="mb-2"><Link to={'/shop'}>All Products</Link></li>
            <li className="mb-2"><Link to={'/'}>Locations Map</Link></li>
            <li className="mb-2"><Link to={'/'}>FAQ</Link></li>
            <li className="mb-2"><Link to={'/'}>Contact us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl text-white font-semibold mb-2">Services</h4>
          <ul className="text-md text-gray-300">
            <li className="mb-2">Order tracking</li>
            <li className="mb-2">
              <Link to={'/cart'}>Wish List</Link>
            </li>
            <li className="mb-2">
              <Link to={'/signin'}>Login</Link>
            </li>
            <li className="mb-2">
              <Link to={'/updateprofile'}>My Profile</Link>
            </li>
            <li className="mb-2">Terms & Conditions</li>
            <li className="mb-2">Promotional Offers</li>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl text-white font-semibold mb-2">Customer Care</h4>
          <ul className="text-md text-gray-300">
            <li className="mb-2">
              <Link to={'/signin'}>Login</Link>
            </li>
            <li className="mb-2">
              <Link to={'/updateprofile'}>My Profile</Link>
            </li>
            <li className="mb-2">
              <Link to={'/cart'}>Wish List</Link>
            </li>
            <li className="mb-2">Order tracking</li>
            <li className="mb-2">FAQ</li>
            <li className="mb-2">Contact us</li>
          </ul>
        </div>

        <div>
          <h4 className="text-2xl text-white font-semibold mb-2">Newsletter</h4>
          <p className=" mb-4 text-md text-gray-300">Subscribe to our weekly Newsletter and receive updates via email.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email*"
              className="p-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-primary  px-4 rounded-r-md ">
              ➔
            </button>
          </div>
          <div className="mt-4">
            <h5 className="text-md text-gray-300 font-semibold mb-2">We Accept</h5>
            <h1 className="bg-primary py-2 px-4 rounded-md w-fit font-bold text-black">Stripe</h1>
          </div>
        </div>
      </div>


      {/* Bottom Section */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-md text-white">© Copyright © 2025 MediMart. All Right Reserved</p>
          <ul className="flex space-x-4 text-md text-white">
            <li className="hover:underline cursor-pointer">Terms & Conditions</li>
            <li className="hover:underline cursor-pointer">Claim</li>
            <li className="hover:underline cursor-pointer">Privacy & Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
