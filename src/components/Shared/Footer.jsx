import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200  text-gray-400">
      <div className="container mx-auto py-10 grid xl:grid-cols-5 lg:grid-cols-4 place-items-center lg:mx-8 xl:mx-auto gap-y-8  justify-center ">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl text-white font-semibold mb-4">Vicodin</h3>
          <p className="text-sm mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <ul className="text-sm space-y-1">
            <li>Brooklyn, New York, United States</li>
            <li>+0123-456789</li>
            <li>example@example.com</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
          <div>
            <h4 className="text-white font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>All Products</li>
              <li>Locations Map</li>
              <li>FAQ</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Services</h4>
            <ul className="space-y-1 text-sm">
              <li>Order tracking</li>
              <li>Wish List</li>
              <li>Login</li>
              <li>My account</li>
              <li>Terms & Conditions</li>
              <li>Promotional Offers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Customer Care</h4>
            <ul className="space-y-1 text-sm">
              <li>Login</li>
              <li>My account</li>
              <li>Wish List</li>
              <li>Order tracking</li>
              <li>FAQ</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to our weekly Newsletter and receive updates via email.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email*"
                className="p-2 rounded-l-md focus:outline-none"
              />
              <button className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600">
                ➔
              </button>
            </div>
            <div className="mt-4">
              <h5 className="text-white font-semibold mb-2">We Accept</h5>
              <img
                src="/path-to-payment-icons.png"
                alt="Payment Methods"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>


      {/* Bottom Section */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black">All Rights Reserved © Company 2025</p>
          <ul className="flex space-x-4 text-sm text-black">
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
