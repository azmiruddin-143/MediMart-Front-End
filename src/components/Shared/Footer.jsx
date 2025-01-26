import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import sitelogo from "../../assets/medicine-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#000000e0] text-gray-400">
      <div className="container mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Left Section */}
        <div>
          <div className="flex items-center mb-5">
            <img className="w-12 sm:w-16 rounded-full" src={sitelogo} alt="MediMart Logo" />
            <h1 className="text-lg sm:text-2xl font-bold text-primary pl-2">
              Medi<span className="text-white">Mart</span>
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            We provide quality medicine products for your health and well-being.
          </p>
          <ul className="text-sm space-y-1">
            <li>Bangladesh, Dhaka, Sonargaon</li>
            <li>+8801933946077</li>
            <li>azmiruddin05@gmail.com</li>
          </ul>
          <div className="flex space-x-4 mt-4 text-xl text-white">
            <FaFacebookF className="hover:text-primary cursor-pointer" />
            <FaTwitter className="hover:text-primary cursor-pointer" />
            <FaLinkedinIn className="hover:text-primary cursor-pointer" />
            <FaYoutube className="hover:text-primary cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/">Locations Map</Link></li>
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Contact us</Link></li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Order tracking</li>
            <li><Link to="/cart">Wish List</Link></li>
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/updateprofile">My Profile</Link></li>
            <li>Terms & Conditions</li>
            <li>Promotional Offers</li>
          </ul>
        </div>

        {/* Customer Care Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/updateprofile">My Profile</Link></li>
            <li><Link to="/cart">Wish List</Link></li>
            <li>Order tracking</li>
            <li>FAQ</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Newsletter</h4>
          <p className="text-sm text-gray-300 mb-4">
            Subscribe to our weekly Newsletter and receive updates via email.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email*"
              className="p-2 rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-primary px-4 rounded-r-md text-black">➔</button>
          </div>
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">We Accept</h5>
            <div className="bg-primary py-2 px-4 rounded-md text-black font-bold">Stripe</div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white">
            © 2025 MediMart. All Rights Reserved.
          </p>
          <ul className="flex space-x-2 sm:space-x-3 text-sm text-white mt-2 sm:mt-0">
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
